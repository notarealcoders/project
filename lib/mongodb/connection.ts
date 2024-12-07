import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use an in-memory MongoDB for development if no URI is provided
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://rohitsingh:t4UrxsCed3tJRqlq@cluster0.g4hvl.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      console.log('Connecting to MongoDB...');
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log('MongoDB connected successfully');
          return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    cached.promise = null;
    throw new Error('Failed to connect to MongoDB');
  }
}

export default connectDB;