const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  createMyCompany,
  getMyCompany,
  updateMyCompany,
} = require("../controllers/companyController");

// CREATE COMPANY PROFILE
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("company"),
  createMyCompany,
);

// GET COMPANY PROFILE
router.get("/profile", authMiddleware, roleMiddleware("company"), getMyCompany);

// UPDATE COMPANY PROFILE WITH LOGO
router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("company"),
  upload.single("logo"),
  updateMyCompany,
);

module.exports = router;
