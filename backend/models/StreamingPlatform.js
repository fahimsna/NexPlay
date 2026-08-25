const mongoose = require("mongoose");

const streamingPlatformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["entertainment", "sports"],
      default: "entertainment",
    },

    description: {
      type: String,
      default: "",
    },

    regions: {
      type: [String],
      default: ["Global"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("StreamingPlatform", streamingPlatformSchema);