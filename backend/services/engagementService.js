const UserEngagement = require("../models/UserEngagement");

const {
  checkAndUnlockRewards,
} = require("./rewardService");



// =====================================
// ACTIVITY REWARDS
// =====================================

const REWARDS = {

  comment: {

    xp: 20,

    coins: 5,

  },


  review: {

    xp: 50,

    coins: 10,

  },

};





// =====================================
// LEVEL CALCULATION
// =====================================

const calculateLevel = (xp)=>{


  if(xp >= 600)

    return 4;



  if(xp >= 300)

    return 3;



  if(xp >= 100)

    return 2;



  return 1;


};





// =====================================
// ADD ENGAGEMENT
// =====================================

const addEngagement = async(
  userId,
  activityType
)=>{


  try{


    const reward =
      REWARDS[activityType];



    if(!reward){


      console.log(
        "Invalid activity type:",
        activityType
      );


      return null;


    }




    let engagement =
      await UserEngagement.findOne({

        userId,

      });





    if(!engagement){


      engagement =
        await UserEngagement.create({

          userId,

          xp:0,

          level:1,

          coins:0,

          rewards:[],

          totalActivities:0,

          engagementScore:0,

          loginStreak:0,

          totalLoginDays:0,

          lastActiveDate:null,

        });


    }






    // ==========================
    // ADD XP
    // ==========================


    engagement.xp += reward.xp;



    // ==========================
    // ADD COINS
    // ==========================


    engagement.coins += reward.coins;



    // ==========================
    // ACTIVITY COUNT
    // ==========================


    engagement.totalActivities += 1;



    // ==========================
    // SCORE
    // ==========================


    engagement.engagementScore += reward.xp;




    // ==========================
    // UPDATE LEVEL
    // ==========================


    engagement.level =
      calculateLevel(
        engagement.xp
      );





    // ==========================
    // CHECK REWARDS
    // ==========================


    checkAndUnlockRewards(
      engagement
    );





    await engagement.save();





    console.log(
      "ENGAGEMENT UPDATED:",
      engagement
    );



    return engagement;



  }

  catch(error){


    console.log(
      "ENGAGEMENT SERVICE ERROR:",
      error.message
    );


    throw error;


  }


};





module.exports = addEngagement;