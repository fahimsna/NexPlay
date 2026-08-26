const Company = require("../models/Company");
const Advertisement = require("../models/Advertisement");
const Campaign = require("../models/Campaign");

// GET COMPANY ANALYTICS

const getCompanyAnalytics = async (req, res) => {
  try {
    // Find company of logged-in user
    const company = await Company.findOne({
      ownerId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // Advertisement Analytics

    const totalAdvertisements = await Advertisement.countDocuments({
      companyId: company._id,
    });

    const activeAdvertisements = await Advertisement.countDocuments({
      companyId: company._id,
      status: "Active",
    });

    const draftAdvertisements = await Advertisement.countDocuments({
      companyId: company._id,
      status: "Draft",
    });

    const completedAdvertisements = await Advertisement.countDocuments({
      companyId: company._id,
      status: "Completed",
    });

    // Campaign Analytics

    const totalCampaigns = await Campaign.countDocuments({
      companyId: company._id,
    });

    const activeCampaigns = await Campaign.countDocuments({
      companyId: company._id,
      status: "active",
    });

    const draftCampaigns = await Campaign.countDocuments({
      companyId: company._id,
      status: "draft",
    });

    const completedCampaigns = await Campaign.countDocuments({
      companyId: company._id,
      status: "completed",
    });

    // Budget Calculation

    const campaigns = await Campaign.find({
      companyId: company._id,
    });

    const totalBudget = campaigns.reduce(
      (sum, campaign) => sum + (campaign.budget || 0),
      0,
    );

    res.status(200).json({
      company: {
        id: company._id,
        name: company.companyName,
        status: company.status,
      },

      advertisements: {
        total: totalAdvertisements,
        active: activeAdvertisements,
        draft: draftAdvertisements,
        completed: completedAdvertisements,
      },

      campaigns: {
        total: totalCampaigns,
        active: activeCampaigns,
        draft: draftCampaigns,
        completed: completedCampaigns,
      },

      budget: totalBudget,
    });
  } catch (error) {
    console.error("Analytics error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getCompanyAnalytics,
};
