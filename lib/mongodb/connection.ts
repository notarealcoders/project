import mongoose from "mongoose";
import { MONGODB_URI, MONGODB_OPTIONS } from "./config";

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  try {
    if (global.mongoose.conn) {
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      const opts = {
        ...MONGODB_OPTIONS,
        bufferCommands: false,
      };

      // Disable automatic indexing in production
      mongoose.set('autoIndex', process.env.NODE_ENV !== 'production');
      
      global.mongoose.promise = mongoose
        .connect(MONGODB_URI!, opts)
        .then((mongoose) => {
          console.log('MongoDB connected successfully');
          return mongoose.connection;
        });
    }

    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    global.mongoose.promise = null;
    throw new Error(
      error instanceof Error ? error.message : "Failed to connect to MongoDB"
    );
  }
}

export default connectDB;