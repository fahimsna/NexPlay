const express=require("express");

const router=express.Router();

const authMiddleware =
require("../middleware/authMiddleware");


const {

updateActivity,

getEngagement,

getMyEngagement

}=require("../controllers/engagementController");



router.get(
"/test",
(req,res)=>{

res.json({

message:"Engagement route working"

});

});



router.post(
"/activity",
authMiddleware,
updateActivity
);



router.get(
"/me",
authMiddleware,
getMyEngagement
);



router.get(
"/:userId",
authMiddleware,
getEngagement
);



module.exports=router;