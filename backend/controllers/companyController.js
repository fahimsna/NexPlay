const Company = require("../models/Company");

// =====================================
// CREATE COMPANY PROFILE
// =====================================
const createMyCompany = async (req, res) => {
  try {
    const existingCompany = await Company.findOne({
      ownerId: req.user.id,
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company profile already exists",
      });
    }

    const company = await Company.create({
      ownerId: req.user.id,

      companyName: req.body.companyName,

      description: req.body.description || "",

      website: req.body.website || "",

      industry: req.body.industry || "Entertainment",

      location: req.body.location || "",

      logo: "",
    });

    res.status(201).json({
      message: "Company profile created",

      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET LOGGED-IN COMPANY PROFILE
// =====================================
const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      ownerId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// UPDATE COMPANY PROFILE + LOGO
// =====================================
const updateMyCompany = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    console.log("FILE:", req.file);

    const updateData = {
      companyName: req.body.companyName,

      description: req.body.description,

      website: req.body.website,

      industry: req.body.industry,

      location: req.body.location,
    };

    // SAVE LOGO NAME
    if (req.file) {
      updateData.logo = req.file.filename;
    }

    const company = await Company.findOneAndUpdate(
      {
        ownerId: req.user.id,
      },

      updateData,

      {
        new: true,
      },
    );

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      message: "Company profile updated successfully",

      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMyCompany,

  getMyCompany,

  updateMyCompany,
};
