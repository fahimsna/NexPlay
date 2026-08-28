const UserEngagement = require("../models/UserEngagement");

const {
  checkAndUnlockRewards,
  getRewardStatus,
  claimReward,
} = require("../services/rewardService");



// =====================================
// ACTIVITY REWARDS
// =====================================

const ACTIVITY_REWARDS = {

  login:{
    xp:5,
    coins:10,
  },

  watch:{
    xp:10,
    coins:2,
  },

  comment:{
    xp:20,
    coins:5,
  },

  review:{
    xp:50,
    coins:10,
  },

  watchlist:{
    xp:10,
    coins:2,
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
// CREATE DEFAULT ENGAGEMENT
// =====================================

const createDefaultEngagement = async(userId)=>{


  return await UserEngagement.create({

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


};




// =====================================
// UPDATE ACTIVITY
// =====================================

const updateActivity = async(req,res)=>{


try{


const {
  userId,
  activityType
}=req.body;



if(!userId || !activityType){

return res.status(400).json({

message:"userId and activityType required"

});

}





const reward =
ACTIVITY_REWARDS[activityType];





if(!reward){

return res.status(400).json({

message:"Invalid activity type"

});

}





let engagement =
await UserEngagement.findOne({
userId
});





if(!engagement){

engagement =
await createDefaultEngagement(userId);

}





// ADD XP

engagement.xp += reward.xp;


// ADD COINS

engagement.coins += reward.coins;


// ACTIVITY COUNT

engagement.totalActivities += 1;


// SCORE

engagement.engagementScore += reward.xp;


// LEVEL UPDATE

engagement.level =
calculateLevel(
engagement.xp
);





// CHECK REWARDS

checkAndUnlockRewards(
engagement
);





await engagement.save();





res.status(200).json({

message:"Activity updated successfully",

engagement

});



}

catch(error){


res.status(500).json({

message:error.message

});


}


};






// =====================================
// GET USER ENGAGEMENT
// =====================================

const getEngagement = async(req,res)=>{


try{


let engagement =

await UserEngagement.findOne({

userId:req.params.userId

});




if(!engagement){

engagement =
await createDefaultEngagement(
req.params.userId
);

}




res.status(200).json(engagement);



}


catch(error){


res.status(500).json({

message:error.message

});


}


};







// =====================================
// GET MY ENGAGEMENT
// =====================================

const getMyEngagement = async(req,res)=>{


try{


let engagement =

await UserEngagement.findOne({

userId:req.user.id

});





if(!engagement){

engagement =
await createDefaultEngagement(
req.user.id
);

}




res.status(200).json(engagement);



}


catch(error){


res.status(500).json({

message:error.message

});


}


};







// =====================================
// GET REWARDS
// =====================================

const getRewards = async(req,res)=>{


try{


const engagement =

await UserEngagement.findOne({

userId:req.user.id

});




if(!engagement){

return res.status(200).json({

coins:0,

rewards:[]

});

}




res.status(200).json({

coins:engagement.coins,

rewards:
getRewardStatus(
engagement
)

});



}


catch(error){


res.status(500).json({

message:error.message

});


}


};








// =====================================
// CLAIM REWARD
// =====================================

const claimRewardController = async(req,res)=>{


try{


const {
rewardId
}=req.body;




const engagement =

await UserEngagement.findOne({

userId:req.user.id

});





if(!engagement){

return res.status(404).json({

message:"Engagement not found"

});

}





const result =
claimReward(

engagement,

rewardId

);





if(!result.success){

return res.status(400).json({

message:result.message

});

}





await engagement.save();





res.status(200).json({

message:result.message,

reward:result.reward

});




}


catch(error){


res.status(500).json({

message:error.message

});


}


};







module.exports = {


updateActivity,

getEngagement,

getMyEngagement,

getRewards,

claimRewardController,


};