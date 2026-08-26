const Campaign = require("../models/Campaign");

// GET MY CAMPAIGNS

const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      companyId: req.user.id,
    })
      .populate("advertisements")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE CAMPAIGN

const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      companyId: req.user.id,

      ...req.body,
    });

    res.status(201).json({
      message: "Campaign created successfully",

      campaign,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CAMPAIGN

const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: req.params.id,
        companyId: req.user.id,
      },

      req.body,

      {
        new: true,
      },
    );

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CAMPAIGN

const deleteCampaign = async (req, res) => {
  try {
    await Campaign.findOneAndDelete({
      _id: req.params.id,

      companyId: req.user.id,
    });

    res.status(200).json({
      message: "Campaign deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyCampaigns,

  createCampaign,

  updateCampaign,

  deleteCampaign,
};
