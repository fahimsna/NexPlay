const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB Connected Successfully");

  } catch (error) {
    console.log("MongoDB Connection Failed:");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;