const mongoose = require("mongoose");

const upcomingContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: true,
    },

    description: {
      type: String,

      default: "",
    },

    releaseDate: {
      type: Date,
    },

    genre: {
      type: String,
    },

    image: {
      type: String,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Company",
    },

    status: {
      type: String,

      enum: ["pending", "approved", "rejected"],

      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UpcomingContent", upcomingContentSchema);
