import { DatabaseError } from './errors';

function validateMongoDBUri(uri: string | undefined): string {
  if (!uri) {
    throw new DatabaseError(
      'MongoDB URI is not defined',
      'Please define the MONGODB_URI environment variable in .env.local'
    );
  }

  try {
    new URL(uri);
  } catch {
    throw new DatabaseError(
      'Invalid MongoDB URI',
      'The MONGODB_URI environment variable contains an invalid URI'
    );
  }

  return uri;
}

export const MONGODB_URI = validateMongoDBUri(process.env.MONGODB_URI);

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
  autoIndex: process.env.NODE_ENV !== 'production',
};