const Company = require("../models/Company");
const Advertisement = require("../models/Advertisement");
const Campaign = require("../models/Campaign");

// GET COMPANY DASHBOARD STATS

const getDashboardStats = async (req, res) => {
  try {
    // Find company owned by logged-in user
    const company = await Company.findOne({
      ownerId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // Count advertisements
    const advertisementCount = await Advertisement.countDocuments({
      companyId: company._id,
    });

    // Count campaigns
    const campaignCount = await Campaign.countDocuments({
      companyId: company._id,
    });

    res.status(200).json({
      company: {
        id: company._id,
        companyName: company.companyName,
        logo: company.logo,
        status: company.status,
      },

      advertisements: advertisementCount,

      campaigns: campaignCount,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
