const Campaign = require("../models/Campaign");

// CREATE CAMPAIGN

exports.createCampaign = async (req, res) => {
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
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY CAMPAIGNS

exports.getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      companyId: req.user.id,
    });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE

exports.updateCampaign = async (req, res) => {
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

    res.json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE

exports.deleteCampaign = async (req, res) => {
  try {
    await Campaign.findOneAndDelete({
      _id: req.params.id,

      companyId: req.user.id,
    });

    res.json({
      message: "Campaign deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
