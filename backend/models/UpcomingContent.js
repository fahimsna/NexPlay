const mongoose = require("mongoose");

<<<<<<< HEAD
const upcomingSchema = new mongoose.Schema(
=======
const upcomingContentSchema = new mongoose.Schema(
>>>>>>> dev
  {
    title: {
      type: String,
      required: true,
    },

<<<<<<< HEAD
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

=======
>>>>>>> dev
    description: {
      type: String,
    },

<<<<<<< HEAD
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
=======
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
>>>>>>> dev
