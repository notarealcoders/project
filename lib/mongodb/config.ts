// Ensure MongoDB URI is properly configured
if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export const MONGODB_URI = process.env.MONGODB_URI;

// Optimized MongoDB connection options
export const MONGODB_OPTIONS = {
  bufferCommands: false,
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  heartbeatFrequencyMS: 30000,
  retryWrites: true,
  w: 'majority',
};