const mongoose = require("mongoose");


const userEngagementSchema = new mongoose.Schema(

{

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true,

    unique: true,

  },



  // =====================
  // XP & LEVEL SYSTEM
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
  // ACTIVITY TRACKING
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

  timestamps:true,

}

);





module.exports = mongoose.model(

"UserEngagement",

userEngagementSchema

);