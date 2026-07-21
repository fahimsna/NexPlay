const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const companyRoutes = require("./routes/companyRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes");

app.use("/api/company", companyRoutes);
app.use("/api/upcoming", upcomingRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully!",
  });
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});