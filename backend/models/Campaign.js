const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    targetAudience: {
      type: String,
      default: "All Users",
    },

    status: {
      type: String,
      enum: ["Draft", "Active", "Paused", "Completed", "Ended"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Campaign", campaignSchema);
