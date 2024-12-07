export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/codeshare";

export const MONGODB_OPTIONS = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};
