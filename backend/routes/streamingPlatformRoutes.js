const express = require("express");

const router = express.Router();

const {
  createPlatform,
  getPlatforms,
  getPlatform,
  updatePlatform,
  deletePlatform,
} = require("../controllers/streamingPlatformController");

router.post("/", createPlatform);

router.get("/", getPlatforms);

router.get("/:id", getPlatform);

router.put("/:id", updatePlatform);

router.delete("/:id", deletePlatform);

module.exports = router;