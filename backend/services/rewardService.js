// =====================================
// REWARD CONFIGURATION
// =====================================

const REWARD_RULES = [

  {
    rewardId: "basic_badge",
    name: "Basic Badge",
    requiredCoins: 50,
  },


  {
    rewardId: "premium_theme",
    name: "Premium Theme",
    requiredCoins: 100,
  },


  {
    rewardId: "pizza_partner",
    name: "Premium Pizza Partner",
    requiredCoins: 200,
  },


  {
    rewardId: "exclusive_membership",
    name: "Exclusive Membership",
    requiredCoins: 500,
  },


];





// =====================================
// CHECK & UNLOCK REWARDS
// =====================================

const checkAndUnlockRewards = (engagement) => {


  if (!Array.isArray(engagement.rewards)) {

    engagement.rewards = [];

  }





  REWARD_RULES.forEach((reward) => {


    const existingReward =

      engagement.rewards.find(

        (item) =>

          item.rewardId === reward.rewardId

      );





    if (

      engagement.coins >= reward.requiredCoins

      &&

      !existingReward

    ) {


      engagement.rewards.push({

        rewardId: reward.rewardId,

        name: reward.name,

        requiredCoins: reward.requiredCoins,

        unlocked: true,

        claimed: false,

        unlockedAt: new Date(),

        claimedAt: null,

      });


      console.log(
        "REWARD UNLOCKED:",
        reward.name
      );


    }


  });




  return engagement;


};






// =====================================
// GET REWARD STATUS
// =====================================

const getRewardStatus = (engagement) => {


  return REWARD_RULES.map((reward) => {


    const savedReward =

      engagement.rewards?.find(

        (item) =>

          item.rewardId === reward.rewardId

      );





    return {


      rewardId: reward.rewardId,


      name: reward.name,


      requiredCoins: reward.requiredCoins,



      unlocked:

        savedReward

        ?

        savedReward.unlocked

        :

        engagement.coins >= reward.requiredCoins,




      claimed:

        savedReward

        ?

        savedReward.claimed

        :

        false,




      unlockedAt:

        savedReward?.unlockedAt || null,




      claimedAt:

        savedReward?.claimedAt || null,



    };


  });


};







// =====================================
// CLAIM REWARD
// =====================================

const claimReward = (engagement, rewardId) => {


  // আগে eligibility check

  checkAndUnlockRewards(
    engagement
  );





  const reward =

    engagement.rewards.find(

      (item) =>

        item.rewardId === rewardId

    );





  if (!reward) {


    return {


      success:false,


      message:"Reward not unlocked yet"


    };


  }






  if (reward.claimed) {


    return {


      success:false,


      message:"Reward already claimed"


    };


  }





  reward.claimed = true;


  reward.claimedAt = new Date();





  return {


    success:true,


    message:"Reward claimed successfully",


    reward


  };



};






module.exports = {


  REWARD_RULES,


  checkAndUnlockRewards,


  getRewardStatus,


  claimReward,


};