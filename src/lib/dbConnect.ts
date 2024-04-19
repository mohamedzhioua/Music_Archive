import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    return { error: "Connection failed!" };
  }
}

export default dbConnect;
