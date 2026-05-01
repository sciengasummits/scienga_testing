import mongoose from 'mongoose';
import dns from 'dns';

// ─── Critical Fix: Only apply global DNS result order on Windows ─────────────
if (process.platform === 'win32') {
  dns.setDefaultResultOrder('ipv4first');
}

const MONGODB_URI = process.env.MONGODB_URI?.trim();

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env');
}

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

  if (!cached.promise) {
    const isWindows = process.platform === 'win32';
    
    const opts = {
      serverSelectionTimeoutMS: 5000, // Reduced to 5s to fail faster if blocked
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 5,
      minPoolSize: 1,
      bufferCommands: true,
      // ─── Apply Windows-specific DNS/IPv4 fixes only on Windows ─────────────
      ...(isWindows ? {
        family: 4,
        lookup: dns.lookup,
      } : {})
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
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
