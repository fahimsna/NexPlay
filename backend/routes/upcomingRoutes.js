const express = require("express");
const router = express.Router();

const {
  getUpcomingContent,
  addUpcomingContent,
  updateUpcomingContent,
  deleteUpcomingContent,
} = require("../controllers/upcomingController");

// Get all upcoming content
router.get("/", getUpcomingContent);

// Add new upcoming content
router.post("/", addUpcomingContent);

// Update content
router.put("/:id", updateUpcomingContent);

// Delete content
router.delete("/:id", deleteUpcomingContent);

module.exports = router;