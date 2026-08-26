const UserEngagement = require("../models/UserEngagement");



// ==========================
// REWARD CONFIG
// ==========================

const REWARDS = {

  login: {
    xp: 5,
    coins: 10,
  },


  watch: {
    xp: 10,
    coins: 2,
  },


  comment: {
    xp: 20,
    coins: 5,
  },


  review: {
    xp: 50,
    coins: 10,
  },


  watchlist: {
    xp: 10,
    coins: 2,
  },


};





// ==========================
// LEVEL SYSTEM
// ==========================

const calculateLevel = (xp)=>{


if(xp >= 600)
return 4;


if(xp >= 300)
return 3;


if(xp >= 100)
return 2;


return 1;


};






// ==========================
// CREATE DEFAULT ENGAGEMENT
// ==========================

const createDefaultEngagement = async(userId)=>{


return await UserEngagement.create({

userId,

xp:0,

level:1,

coins:0,

totalActivities:0,

engagementScore:0,

loginStreak:0,

totalLoginDays:0,

lastActiveDate:null


});


};







// ==========================
// UPDATE ACTIVITY
// ==========================

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





const type =
activityType.toLowerCase();





const reward =
REWARDS[type];





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




// ==========================
// DAILY LOGIN CHECK
// ==========================


if(type==="login"){


const today = new Date();


const last =
engagement.lastActiveDate;



let canReward = true;



if(last){


const lastDay =
new Date(

last.getFullYear(),

last.getMonth(),

last.getDate()

);



const todayDay =
new Date(

today.getFullYear(),

today.getMonth(),

today.getDate()

);



const diff =
Math.floor(

(todayDay-lastDay)
/
(1000*60*60*24)

);



if(diff===0){


canReward=false;


}



else if(diff===1){


engagement.loginStreak +=1;


}



else{


engagement.loginStreak=1;


}



}



else{


engagement.loginStreak=1;


}






if(canReward){


engagement.xp += reward.xp;

engagement.coins += reward.coins;

engagement.totalActivities +=1;

engagement.totalLoginDays +=1;

engagement.engagementScore += reward.xp;


}




engagement.lastActiveDate =
new Date();



}

else{


// Other activities always reward


engagement.xp += reward.xp;

engagement.coins += reward.coins;

engagement.totalActivities +=1;

engagement.engagementScore += reward.xp;


}





engagement.level =
calculateLevel(

engagement.xp

);





await engagement.save();





return res.json({

message:"Activity updated",

engagement

});





}


catch(error){


console.log(error);


return res.status(500).json({

message:error.message

});


}


};









// ==========================
// GET ENGAGEMENT
// ==========================


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





res.json(engagement);



}


catch(error){


res.status(500).json({

message:error.message

});


}


};









// ==========================
// GET MY ENGAGEMENT
// ==========================


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




res.json(engagement);



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

getMyEngagement


};