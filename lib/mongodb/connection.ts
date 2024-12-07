import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Use an in-memory MongoDB for development if no URI is provided
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://rohitsingh:t4UrxsCed3tJRqlq@cluster0.g4hvl.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

const cached = globalThis.mongoose;

async function connectDB() {
  try {
    if (cached.conn) {
      console.log("Using cached MongoDB connection");
      return cached.conn;
    }

    if (!cached.promise) {
      const opts: mongoose.ConnectOptions = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        // You can add more options as needed
      };

      console.log("Connecting to MongoDB...");
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongooseInstance) => {
          console.log("MongoDB connected successfully");
          return mongooseInstance.connection;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e: any) {
    console.error("MongoDB connection error:", e);
    cached.promise = null;
    throw new Error(`Failed to connect to MongoDB: ${e.message}`);
  }
}

export default connectDB;
