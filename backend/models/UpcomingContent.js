const mongoose = require("mongoose");

const upcomingSchema = new mongoose.Schema(
  {
    title: {
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
      required: true,
    },

    trailerURL: {
      type: String,
    },

    releaseDate: {
      type: String,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      default: "Coming Soon",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Upcoming", upcomingSchema);