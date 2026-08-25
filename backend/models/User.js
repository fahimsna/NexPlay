const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["admin", "company", "user"],
      default: "user",
    },

    // =======================
    // Sprint 4
    // Favourite Genres
    // =======================

    favouriteGenres: {
      type: [String],
      default: [],
    },

    // =======================
    // Sprint 4
    // Favourite Sports
    // =======================

    favouriteSports: {
      type: [String],
      default: [],
    },

    // =======================
    // Sprint 4
    // Watchlist
    // =======================

    watchlist: [
      {
        tmdbId: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        posterPath: {
          type: String,
          default: null,
        },

        backdropPath: {
          type: String,
          default: null,
        },

        overview: {
          type: String,
          default: "",
        },

        releaseDate: {
          type: String,
          default: "",
        },

        rating: {
          type: Number,
          default: 0,
        },

        contentType: {
          type: String,
          enum: ["movie", "tv"],
          default: "movie",
        },

        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
