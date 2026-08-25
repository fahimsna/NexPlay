const mongoose = require("mongoose");

const featuredContentSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    posterPath: {
      type: String,
      default: "",
    },

    section: {
      type: String,
      enum: ["trending", "featured"],
      default: "featured",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: false,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

featuredContentSchema.index(
  { tmdbId: 1, mediaType: 1, section: 1 },
  { unique: true },
);

module.exports = mongoose.model("FeaturedContent", featuredContentSchema);