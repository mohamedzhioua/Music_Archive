import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  try {
    if (!MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export default dbConnect;
