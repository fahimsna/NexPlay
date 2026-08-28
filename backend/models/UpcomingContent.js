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


    category: {
      type: String,
      required: true,
    },


    genre: {
      type: String,
      required: true,
    },


    // support old frontend
    imageUrl: {
      type: String,
      default: "",
    },


    // support new frontend
    poster: {
      type: String,
      default: "",
    },


    trailerURL: {
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
  }
);


module.exports = mongoose.model(
  "UpcomingContent",
  upcomingContentSchema
);