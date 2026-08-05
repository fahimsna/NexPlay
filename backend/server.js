const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const settingsRoutes = require("./routes/settingsRoutes");

dotenv.config();

const app = express();

// =======================
// DATABASE CONNECTION
// =======================
connectDB();

// =======================
// MIDDLEWARE
// =======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// STATIC FILES
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// ROUTES
// =======================
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes");

// =======================
// API ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upcoming", upcomingRoutes);
app.use("/api/settings", settingsRoutes);

// =======================
// ROOT ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("NexPlay Backend Running");
});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});