import mongoose from 'mongoose';
import process from 'process';

export const connectDB = async () => {
  try {
    const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solestore_db';
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};