const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    contentId: {
      type: String,
      required: true,
    },

    contentType: {
      type: String,
      enum: ["movie", "series", "sports"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    posterPath: {
      type: String,
      default: null,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UserActivity", userActivitySchema);
