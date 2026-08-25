const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["movie", "tv", "sports"],
      required: true,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
      default: "Guest",
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    likedBy: {
      type: [String],
      default: [],
    },

    reports: [
      {
        reason: { type: String, default: "" },
        reportedBy: { type: String, default: "anonymous" },
        reportedAt: { type: Date, default: Date.now },
      },
    ],

    status: {
      type: String,
      enum: ["visible", "hidden", "removed"],
      default: "visible",
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ tmdbId: 1, mediaType: 1, createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);