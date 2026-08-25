const express = require("express");

const {
  addActivity,
  getRecentActivity,
  getActivityHistory,
} = require("../controllers/activityController");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// =======================
// Activity
// =======================

router.post("/", authMiddleware, addActivity);

router.get("/recent", authMiddleware, getRecentActivity);

router.get("/history", authMiddleware, getActivityHistory);

module.exports = router;
