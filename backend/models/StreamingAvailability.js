const mongoose = require("mongoose");

const streamingAvailabilitySchema = new mongoose.Schema(
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

    title: {
      type: String,
      required: true,
    },

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StreamingPlatform",
      required: true,
    },

    accessType: {
      type: String,
      enum: ["subscription", "rental", "purchase", "free"],
      default: "subscription",
    },

    region: {
      type: String,
      default: "Global",
    },

    redirectUrl: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

streamingAvailabilitySchema.index({ tmdbId: 1, mediaType: 1 });

module.exports = mongoose.model(
  "StreamingAvailability",
  streamingAvailabilitySchema,
);