const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
<<<<<<< HEAD
    console.log("Connecting MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected Successfully");
=======
    await mongoose.connect(process.env.MONGO_URI);
>>>>>>> 4e27ec318c345f0fd0e7fd2bdd02b4ed28ee7b35

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
<<<<<<< HEAD
=======

    process.exit(1);
>>>>>>> 4e27ec318c345f0fd0e7fd2bdd02b4ed28ee7b35
  }
};

module.exports = connectDB;
