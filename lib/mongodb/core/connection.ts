import mongoose from "mongoose";
import { MONGODB_URI, MONGODB_OPTIONS } from "./config";
import { DatabaseError } from "./errors";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private _connection: mongoose.Connection | null = null;
  private connectionPromise: Promise<mongoose.Connection> | null = null;
  private connectionAttempts = 0;
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private async attemptConnection(): Promise<mongoose.Connection> {
    try {
      console.log('Attempting MongoDB connection...');
      
      mongoose.set('autoIndex', process.env.NODE_ENV !== 'production');
      
      const mongooseInstance = await mongoose.connect(MONGODB_URI!, {
        ...MONGODB_OPTIONS,
        serverSelectionTimeoutMS: 5000, // Faster timeout for first connection
      });

      console.log('MongoDB connected successfully');
      this._connection = mongooseInstance.connection;
      this.connectionAttempts = 0;
      return this._connection;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('MongoDB connection error:', errorMessage);
      throw new DatabaseError('Connection attempt failed', errorMessage);
    }
  }

  async connect(): Promise<mongoose.Connection> {
    try {
      // Return existing connection if available
      if (this._connection?.readyState === 1) {
        return this._connection;
      }

      // Clear existing failed connection
      if (this._connection?.readyState !== 2) { // Not connecting
        this._connection = null;
        this.connectionPromise = null;
      }

      // Attempt new connection with retries
      while (this.connectionAttempts < this.maxRetries) {
        try {
          if (!this.connectionPromise) {
            this.connectionPromise = this.attemptConnection();
          }
          return await this.connectionPromise;
        } catch (error) {
          this.connectionAttempts++;
          console.error(`Connection attempt ${this.connectionAttempts} failed`);
          
          if (this.connectionAttempts === this.maxRetries) {
            throw error;
          }
          
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          this.connectionPromise = null;
        }
      }

      throw new DatabaseError('Max connection attempts reached');
    } catch (error) {
      this.connectionPromise = null;
      this._connection = null;
      throw new DatabaseError(
        'Connection failed after retries',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async disconnect(): Promise<void> {
    if (this._connection) {
      try {
        await mongoose.disconnect();
        this._connection = null;
        this.connectionPromise = null;
        this.connectionAttempts = 0;
        console.log('MongoDB disconnected successfully');
      } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw new DatabaseError(
          'Disconnect failed',
          error instanceof Error ? error.message : 'Unknown error'
        );
      }
    }
  }
}

export const dbConnection = DatabaseConnection.getInstance();