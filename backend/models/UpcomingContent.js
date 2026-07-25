const mongoose = require("mongoose");

const upcomingContentSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    trailerUrl: {
      type: String,
    },

    releaseDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Coming Soon", "Released"],
      default: "Coming Soon",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UpcomingContent", upcomingContentSchema);
