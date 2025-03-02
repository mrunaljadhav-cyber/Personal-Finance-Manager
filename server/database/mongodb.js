import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connect() {
  try {
    const uri = process.env.MONGO_DB_URL;
    await mongoose.connect(uri);
    console.log("MongoDB connection is successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connect;