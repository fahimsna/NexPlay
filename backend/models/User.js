const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

{
  // =======================
  // Basic Information
  // =======================

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
    enum: [
      "admin",
      "company",
      "user"
    ],
    default: "user",
  },



  // =======================
  // Favourite Genres
  // =======================

  favouriteGenres: {

    type: [String],

    default: [],

  },



  // =======================
  // Favourite Sports
  // =======================

  favouriteSports: {

    type: [String],

    default: [],

  },



  // =======================
  // Favourite Teams
  // =======================

  favouriteTeams: {

    type: [String],

    default: [],

  },



  // =======================
  // Favourite Tournaments
  // =======================

  favouriteTournaments: {

    type: [String],

    default: [],

  },



  // =======================
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

    }

  ],



  // =======================
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

        enum: [
          "movie",
          "tv"
        ],

        default: "movie",

      },


      addedAt: {

        type: Date,

        default: Date.now,

      },


    }

  ],
  // =======================
  // Activity Points
  // =======================

  activityPoints: {

    type: Number,

    default: 0,

  },



  // =======================
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
  // Achievement Badges
  // =======================

  badges: {

    type: [String],

    default: [],

  },



  // =======================
  // Notification Settings
  // =======================

  notificationsEnabled: {

    type: Boolean,

    default: true,

  },



  // =======================
  // Referral System (Fixed)
  // =======================


  referralCode: {

    type: String,

    unique: true,

    sparse: true,

    default: null,

  },



  referredBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    default: null,

  },



  referrals: [

    {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

    }

  ],



  referralCount: {

    type: Number,

    default: 0,

  },


},

{


  timestamps: true,


}

);





module.exports = mongoose.model(

  "User",

  userSchema

);