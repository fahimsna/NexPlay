const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
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

app.use("/api/company", companyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
