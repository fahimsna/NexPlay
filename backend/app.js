const express = require("express");
const cors = require("cors");
const advertisementRoutes = require("./routes/advertisementRoutes");
const campaignRoutes = require("./routes/campaignRoutes");

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
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/test", testRoutes);
app.use("/api/campaigns", campaignRoutes);

// Root Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully!",
  });
});
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
