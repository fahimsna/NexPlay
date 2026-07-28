const mongoose = require("mongoose");

const upcomingContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    poster: {
      type: String,
      default: "",
    },

    trailer: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Coming Soon", "Released"],
      default: "Coming Soon",
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UpcomingContent", upcomingContentSchema);
