const express = require("express");

const router = express.Router();

const {
  createAvailability,
  getAvailabilityForContent,
  getAllAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/streamingAvailabilityController");

router.post("/", createAvailability);

router.get("/", getAllAvailability);

router.get("/content/:mediaType/:tmdbId", getAvailabilityForContent);

router.put("/:id", updateAvailability);

router.delete("/:id", deleteAvailability);

module.exports = router;