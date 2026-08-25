const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createReview,
  getReviewsForContent,
  getMyReviews,
  updateReview,
  deleteReview,
  getTopRatedContent,
} = require("../controllers/reviewController");

// TOP RATED CONTENT (public)
router.get("/top-rated", getTopRatedContent);

// MY REVIEWS (auth)
router.get("/my", authMiddleware, getMyReviews);

// REVIEWS FOR ONE PIECE OF CONTENT (public)
router.get("/content/:contentType/:contentId", getReviewsForContent);

// CREATE REVIEW (auth)
router.post("/", authMiddleware, createReview);

// UPDATE / DELETE REVIEW (auth, owner only - enforced in controller)
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
