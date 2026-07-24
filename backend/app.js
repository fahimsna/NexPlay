const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const testRoutes = require("./routes/testRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/test", testRoutes);

// Root Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully!",
  });
});

module.exports = app;
