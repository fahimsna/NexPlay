const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

// GET ALL COMPANY CAMPAIGNS
router.get("/my", authMiddleware, getMyCampaigns);

// CREATE CAMPAIGN
router.post("/", authMiddleware, createCampaign);

// UPDATE CAMPAIGN
router.put("/:id", authMiddleware, updateCampaign);

// DELETE CAMPAIGN
router.delete("/:id", authMiddleware, deleteCampaign);

module.exports = router;
