import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function test() {
    try {
        console.log('⏳ Testing connection...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connection Successful!');
        process.exit(0);
    } catch (e) {
        console.error('❌ Connection Failed:', e.message);
        process.exit(1);
    }
}

test();
