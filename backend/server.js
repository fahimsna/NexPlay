const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const analyticsRoutes = require("./routes/analyticsRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes");

// LOAD ENV
dotenv.config();

const app = express();

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

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// =======================
// STATIC FILES
// =======================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// DATABASE CONNECTION
// =======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error.message);
  });

// =======================
// ROUTES
// =======================

const authRoutes = require("./routes/authRoutes");

const companyRoutes = require("./routes/companyRoutes");

const advertisementRoutes = require("./routes/advertisementRoutes");

const campaignRoutes = require("./routes/campaignRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

// =======================
// API ROUTES
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/advertisements", advertisementRoutes);

app.use("/api/campaigns", campaignRoutes);

app.use("/api/dashboard", dashboardRoutes);

// =======================
// TEST ROUTE
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
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upcoming", upcomingRoutes);
