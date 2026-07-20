const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  console.log("Home route reached");

  res.json({
    message: "Backend is working",
  });
});

// Database
connectDB();

// Company route
const companyRoutes = require("./routes/companyRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes");

app.use("/api/company", companyRoutes);
app.use("/api/upcoming", upcomingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
