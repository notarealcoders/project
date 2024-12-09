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

      global.mongoose.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongoose) => {
          return mongoose.connection;
        });
    }

    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    global.mongoose.promise = null;
    throw new Error("Failed to connect to MongoDB");
  }
}

export default connectDB;