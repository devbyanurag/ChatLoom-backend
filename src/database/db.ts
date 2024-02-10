// db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('MongoDB connection string is not provided.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
  
    console.log('MongoDB connected');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    } else {
      console.error('Unknown error connecting to MongoDB');
    }

    process.exit(1);
  }
};

export default connectDB;
