const express = require("express");

const router = express.Router();

const {
  createFeaturedContent,
  getFeaturedContent,
  updateFeaturedContent,
  deleteFeaturedContent,
} = require("../controllers/featuredContentController");

router.post("/", createFeaturedContent);

router.get("/", getFeaturedContent);

router.put("/:id", updateFeaturedContent);

router.delete("/:id", deleteFeaturedContent);

module.exports = router;