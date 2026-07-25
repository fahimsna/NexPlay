const express = require("express");

const router = express.Router();

const {
  createCampaign,
  getMyCampaigns,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCampaign);

router.get("/my", authMiddleware, getMyCampaigns);

router.put("/:id", authMiddleware, updateCampaign);

router.delete("/:id", authMiddleware, deleteCampaign);

module.exports = router;
