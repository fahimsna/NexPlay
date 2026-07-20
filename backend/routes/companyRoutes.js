const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Create Company
router.post("/", upload.single("logo"), createCompany);

// Get All Companies
router.get("/", getCompanies);

// Get Single Company
router.get("/:id", getCompany);

// Update Company
router.put("/:id", upload.single("logo"), updateCompany);

// Delete Company
router.delete("/:id", deleteCompany);

module.exports = router;
