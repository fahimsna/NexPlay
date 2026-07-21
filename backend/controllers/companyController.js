const Company = require("../models/Company");

// CREATE COMPANY
const createCompany = async (req, res) => {
  try {
    const companyData = {
      companyName: req.body.companyName,
      website: req.body.website,
      industry: req.body.industry,
      description: req.body.description,
    };

    // Save uploaded logo path
    if (req.file) {
      companyData.logo = `/uploads/${req.file.filename}`;
    }

    const company = await Company.create(companyData);

    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL COMPANIES
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE COMPANY
const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE COMPANY
const updateCompany = async (req, res) => {
  try {
    const updateData = {
      companyName: req.body.companyName,
      website: req.body.website,
      industry: req.body.industry,
      description: req.body.description,
    };

    // Update logo if a new one is uploaded
    if (req.file) {
      updateData.logo = `/uploads/${req.file.filename}`;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE COMPANY
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
