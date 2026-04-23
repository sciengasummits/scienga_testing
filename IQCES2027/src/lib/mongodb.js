import mongoose from 'mongoose';
import dns from 'dns';

// ─── Critical Fix: Node.js c-ares DNS fails for mongodb.net on Windows ──────
dns.setDefaultResultOrder('ipv4first');

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    // In some build environments, we want to allow the build to proceed even if DB is missing
    if (process.env.NODE_ENV === 'production') {
       // Return null or throw depending on how critical it is
       // For now, let's keep it throwing to ensure the user knows they MUST set it, 
       // but since it's inside the function, it won't crash the module import.
       throw new Error('Please define the MONGODB_URI environment variable in .env (or Vercel Settings)');
    }
    return null;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 45000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 5,
      minPoolSize: 1,
      family: 4,       // Force IPv4
      lookup: dns.lookup, // Use OS DNS resolver (fixes c-ares failures on Windows)
      bufferCommands: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      const dbName = mongoose.connection.name;
      console.log(`✅ MongoDB connected to database: ${dbName}`);
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
