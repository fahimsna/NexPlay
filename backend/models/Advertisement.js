const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema(
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
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["Banner", "Poster", "Video", "Social"],
      default: "Banner",
    },

    status: {
      type: String,
      enum: ["Draft", "Active", "Paused", "Completed"],
      default: "Draft",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Advertisement", advertisementSchema);
