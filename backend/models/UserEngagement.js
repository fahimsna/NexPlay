const mongoose = require("mongoose");


// =====================================
// REWARD SCHEMA
// =====================================

const rewardSchema = new mongoose.Schema(
{
  rewardId: {

    type: String,

    required: true,

  },


  name: {

    type: String,

    required: true,

  },


  requiredCoins: {

    type: Number,

    required: true,

  },


  unlocked: {

    type: Boolean,

    default: false,

  },


  claimed: {

    type: Boolean,

    default: false,

  },


  claimedAt: {

    type: Date,

    default: null,

  },


  unlockedAt: {

    type: Date,

    default: null,

  },


},
{
  _id:false
});





// =====================================
// USER ENGAGEMENT SCHEMA
// =====================================

const userEngagementSchema = new mongoose.Schema(

{

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true,

    unique: true,

  },



  // =====================
  // XP SYSTEM
  // =====================

  xp: {

    type: Number,

    default: 0,

  },


  level: {

    type: Number,

    default: 1,

  },



  // =====================
  // COIN SYSTEM
  // =====================

  coins: {

    type: Number,

    default: 0,

  },



  // =====================
  // REWARD SYSTEM
  // =====================

  rewards: {

    type: [rewardSchema],

    default: [],

  },



  // =====================
  // ACTIVITY SYSTEM
  // =====================

  totalActivities: {

    type: Number,

    default: 0,

  },


  engagementScore: {

    type: Number,

    default: 0,

  },



  // =====================
  // LOGIN STREAK SYSTEM
  // =====================

  loginStreak: {

    type: Number,

    default: 0,

  },


  totalLoginDays: {

    type: Number,

    default: 0,

  },


  lastActiveDate: {

    type: Date,

    default: null,

  },


},

{

  timestamps: true,

}

);





module.exports = mongoose.model(

  "UserEngagement",

  userEngagementSchema

);