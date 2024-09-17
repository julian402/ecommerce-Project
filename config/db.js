import mongoose from "mongoose";

async function connectDB() {
    try {
      const connection = await mongoose.connect(
        process.env.DB_CONETION_STRING
      );
      console.log("Successfully connected to MongoDB");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  
  export default connectDB;