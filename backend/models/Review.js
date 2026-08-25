const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| REVIEW MODEL
|--------------------------------------------------------------------------
|
| Sprint 4: Ratings & Reviews
|
| A review is attached to a piece of content by its external id + type
| (movies/tv come from TMDB, so we don't store the content itself, only
| a reference to it: contentId + contentType).
|
| Rating is stored 1-10 (shown to users as 5 stars, rating/2) to match
| NexPlay's existing rating convention elsewhere in the app.
|
|--------------------------------------------------------------------------
*/

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    contentId: {
      type: String,
      required: [true, "Content id is required"],
    },

    contentType: {
      type: String,
      enum: ["movie", "tv"],
      default: "movie",
    },

    contentTitle: {
      type: String,
      default: "",
    },

    contentPoster: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 10,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

// One review per user per piece of content
reviewSchema.index(
  { userId: 1, contentId: 1, contentType: 1 },
  { unique: true },
);

module.exports = mongoose.model("Review", reviewSchema);
