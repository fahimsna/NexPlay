const addEngagement = require("../services/engagementService");
const Review = require("../models/Review");

/*
|--------------------------------------------------------------------------
| Sprint 4: Ratings & Reviews
|
| Rating is stored 1-10 (shown to users as 5 stars, rating/2).
|--------------------------------------------------------------------------
*/

// =====================================
// CREATE REVIEW
// =====================================
const createReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const { contentId, contentType, contentTitle, contentPoster, rating, comment } =
      req.body;

    if (!contentId || !rating) {
      return res.status(400).json({
        message: "contentId and rating are required",
      });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({
        message: "Rating must be between 1 and 10",
      });
    }

    const existing = await Review.findOne({
      userId,
      contentId,
      contentType: contentType || "movie",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already reviewed this title. Edit your existing review instead.",
      });
    }

    const review = await Review.create({
      userId,
      contentId,
      contentType: contentType || "movie",
      contentTitle: contentTitle || "",
      contentPoster: contentPoster || "",
      rating,
      comment: comment || "",
    });
    await addEngagement(userId,"review");

    res.status(201).json({
      message: "Review submitted",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET REVIEWS FOR A PIECE OF CONTENT (+ average rating)
// =====================================
const getReviewsForContent = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;

    const reviews = await Review.find({
      contentId,
      contentType,
    })
      .populate("userId", "fullName username")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    res.status(200).json({
      reviews,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET MY REVIEWS (paginated)
// =====================================
const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Review.countDocuments({ userId }),
    ]);

    res.status(200).json({
      reviews,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// UPDATE REVIEW (owner only)
// =====================================
const updateReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    if (req.body.rating !== undefined) {
      if (req.body.rating < 1 || req.body.rating > 10) {
        return res.status(400).json({
          message: "Rating must be between 1 and 10",
        });
      }

      review.rating = req.body.rating;
    }

    if (req.body.comment !== undefined) {
      review.comment = req.body.comment;
    }

    await review.save();

    res.status(200).json({
      message: "Review updated",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// DELETE REVIEW (owner only)
// =====================================
const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// TOP RATED CONTENT
// (grouped by content, sorted by average rating, min 1 review)
// =====================================
const getTopRatedContent = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 12;

    const topRated = await Review.aggregate([
      {
        $group: {
          _id: { contentId: "$contentId", contentType: "$contentType" },
          contentTitle: { $last: "$contentTitle" },
          contentPoster: { $last: "$contentPoster" },
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      {
        $match: {
          totalReviews: { $gte: 1 },
        },
      },
      {
        $sort: {
          averageRating: -1,
          totalReviews: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 0,
          contentId: "$_id.contentId",
          contentType: "$_id.contentType",
          contentTitle: 1,
          contentPoster: 1,
          averageRating: { $round: ["$averageRating", 1] },
          totalReviews: 1,
        },
      },
    ]);

    res.status(200).json({ topRated });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviewsForContent,
  getMyReviews,
  updateReview,
  deleteReview,
  getTopRatedContent,
};
