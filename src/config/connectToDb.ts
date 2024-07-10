//Load env variables
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

import mongoose from 'mongoose';


async function connectToDb(): Promise<void> {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL environment variable is not defined');
    }

    await mongoose.connect(process.env.DB_URL!);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export default connectToDb;

