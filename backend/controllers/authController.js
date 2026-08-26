const User = require("../models/User");
const Company = require("../models/Company");
const UserEngagement = require("../models/UserEngagement");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




// ==========================
// GENERATE TOKEN
// ==========================

const generateToken = (id, role) => {

  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"7d",
    }
  );

};







// ==========================
// REGISTER
// ==========================

const register = async(req,res)=>{


try{


const {

fullName,

username,

email,

password,

role,

companyName,

referralCode


}=req.body;







// CHECK EXISTING USER


const existingUser =
await User.findOne({

$or:[

{
email
},

{
username
}

]

});




if(existingUser){


return res.status(400).json({

message:"User already exists"

});


}








// ==========================
// REFERRAL SYSTEM
// ==========================


let referrer = null;



if(referralCode){


const code =
referralCode
.trim()
.toUpperCase();




referrer =
await User.findOne({

referralCode:code

});





if(!referrer){


const usernameCode =
code.replace("1001","");



referrer =
await User.findOne({

username:usernameCode

});


}





if(!referrer){


return res.status(400).json({

message:"Invalid referral code"

});


}


}








// HASH PASSWORD


const hashedPassword =
await bcrypt.hash(

password,

10

);








// CREATE USER


const user =
await User.create({

fullName,

username,

email,

password:hashedPassword,

role:role || "user",



referralCode:

username
.toUpperCase()
+"1001",




referredBy:

referrer
?
referrer._id
:
null,



referralCount:0,


referrals:[]


});








// UPDATE REFERRER


if(referrer){



referrer.referralCount =
(referrer.referralCount || 0)
+1;




if(!referrer.referrals){

referrer.referrals=[];

}




referrer.referrals.push(

user._id

);



await referrer.save();







const engagement =
await UserEngagement.findOne({

userId:referrer._id

});





if(engagement){


engagement.coins +=50;


await engagement.save();


}



}








// COMPANY PROFILE


if(user.role==="company"){


if(!companyName){


return res.status(400).json({

message:"Company name required"

});


}





await Company.create({

ownerId:user._id,

companyName,

description:"",

website:"",

industry:"Entertainment",

location:"",

status:"pending"

});


}








return res.status(201).json({

message:"Registration successful",


user:{


id:user._id,

fullName:user.fullName,

username:user.username,

email:user.email,

role:user.role,

referralCode:user.referralCode


},


token:

generateToken(

user._id,

user.role

)


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
// LOGIN
// ==========================

const login = async(req,res)=>{


try{


const {

email,

password

}=req.body;






const user =
await User.findOne({

email

});





if(!user){


return res.status(404).json({

message:"User not found"

});


}






const isMatch =
await bcrypt.compare(

password,

user.password

);





if(!isMatch){


return res.status(401).json({

message:"Invalid password"

});


}








// ==========================
// LOGIN DAILY REWARD
// ==========================


let engagement =

await UserEngagement.findOne({

userId:user._id

});





if(!engagement){


engagement =
await UserEngagement.create({

userId:user._id,

xp:5,

level:1,

coins:10,

totalActivities:1,

engagementScore:5,

loginStreak:1,

totalLoginDays:1,

lastActiveDate:new Date()


});


}

else{


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




if(
todayDay.getTime()
===
lastDay.getTime()
){

canReward=false;

}

else{


const diff =
Math.floor(

(todayDay-lastDay)
/
(1000*60*60*24)

);



if(diff===1){

engagement.loginStreak +=1;

}

else{

engagement.loginStreak=1;

}


}


}



if(canReward){


engagement.xp +=5;

engagement.coins +=10;

engagement.totalActivities +=1;

engagement.totalLoginDays +=1;

engagement.engagementScore +=5;


}





engagement.lastActiveDate =
new Date();





// Level update


if(engagement.xp >=600){

engagement.level=4;

}

else if(engagement.xp >=300){

engagement.level=3;

}

else if(engagement.xp >=100){

engagement.level=2;

}

else{

engagement.level=1;

}





await engagement.save();


}








return res.json({

message:"Login successful",




user:{


id:user._id,

fullName:user.fullName,

username:user.username,

email:user.email,

role:user.role,

referralCode:user.referralCode


},



engagement,



token:

generateToken(

user._id,

user.role

)


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
// GET CURRENT USER
// ==========================


const getMe = async(req,res)=>{


try{


const user =

await User.findById(

req.user.id

)

.select("-password");





return res.json({

user

});



}


catch(error){


return res.status(500).json({

message:error.message

});


}


};









// ==========================
// EXPORT
// ==========================


module.exports = {


register,

login,

getMe


};