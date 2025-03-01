import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local')
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  console.log('in connectDB with URI:'+ MONGODB_URI);

  try {
    console.log('in try');
    if (cached.conn) {
      console.log('Using cached connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log('Connecting to MongoDB... with URI:', MONGODB_URI);
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    cached.conn = await cached.promise;
    console.log('New connection established');
    return cached.conn;
  } catch (e) {
    console.log('in catch');
    console.error('MongoDB connection error:', e);
    throw e;
  }
}

export default connectDB; 