const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getCompanyAnalytics } = require("../controllers/analyticsController");

router.get("/company", authMiddleware, getCompanyAnalytics);

module.exports = router;
