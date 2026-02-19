const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize dotenv within the file to ensure the URL is available before connecting
dotenv.config();

const connectDB = async () => {
  try {
    // Ensure the variable name matches exactly what is in your .env file
    const mongoURI = process.env.MONGODB_URL;
    
    if (!mongoURI) {
      throw new Error("MONGODB_URL is not defined in .env file");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully...");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = { connectDB };