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
    // Sprint 2
    // Favourite Genres
    // =======================

    favouriteGenres: {
      type: [String],
      default: [],
    },


    // =======================
    // Sprint 3
    // Favourite Sports
    // =======================

    favouriteSports: {
      type: [String],
      default: [],
    },


    // =======================
    // Sprint 3
    // Favourite Teams
    // =======================

    favouriteTeams: {
      type: [String],
      default: [],
    },


    // =======================
    // Sprint 3
    // Favourite Tournaments
    // =======================

    favouriteTournaments: {
      type: [String],
      default: [],
    },


    // =======================
    // Sprint 3
    // Match Reminders
    // =======================

    matchReminders: [
      {
        matchId: {
          type: String,
        },

        matchName: {
          type: String,
        },

        reminderTime: {
          type: Date,
        },
      },
    ],


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


    // =======================
    // Sprint 4
    // Activity Points
    // =======================

    activityPoints: {
      type: Number,
      default: 0,
    },


    // =======================
    // Sprint 4
    // User Level
    // =======================

    level: {
      type: String,
      enum: [
        "Bronze",
        "Silver",
        "Gold",
        "Platinum"
      ],
      default: "Bronze",
    },


    // =======================
    // Sprint 4
    // Achievement Badges
    // =======================

    badges: {
      type: [String],
      default: [],
    },


    // =======================
    // Sprint 4
    // Notification Settings
    // =======================

    notificationsEnabled: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);
