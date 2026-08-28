const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");



const {

  updateActivity,

  getEngagement,

  getMyEngagement,

  getRewards,

  claimRewardController,


} = require("../controllers/engagementController");





// =====================================
// TEST ROUTE
// =====================================

router.get(
"/test",
(req,res)=>{

  res.json({

    message:"Engagement route working"

  });

});





// =====================================
// UPDATE ACTIVITY
// =====================================

router.post(

"/activity",

authMiddleware,

updateActivity

);





// =====================================
// CURRENT USER ENGAGEMENT
// =====================================

router.get(

"/me",

authMiddleware,

getMyEngagement

);





// =====================================
// GET REWARD STATUS
// =====================================

router.get(

"/rewards/me",

authMiddleware,

getRewards

);





// =====================================
// CLAIM REWARD
// =====================================

router.post(

"/rewards/claim",

authMiddleware,

claimRewardController

);





// =====================================
// USER ENGAGEMENT BY ID
// =====================================

router.get(

"/:userId",

authMiddleware,

getEngagement

);





module.exports = router;