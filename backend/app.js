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
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/test", testRoutes);
app.use("/api/campaigns", campaignRoutes);

// Sprint 1: Admin Dashboard + Company Verification
app.use("/api/admin", adminRoutes);

// Sprint 4: Ratings & Reviews
app.use("/api/reviews", reviewRoutes);

// Root Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully!",
  });
});
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
