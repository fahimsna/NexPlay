const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  getAllCompanies,
  approveCompany,
  rejectCompany,
  getAllUsers,
  getActivityLog,
} = require("../controllers/adminController");

// Every route below requires an authenticated admin
router.use(authMiddleware, roleMiddleware("admin"));

router.get("/dashboard", getDashboardStats);

router.get("/companies", getAllCompanies);
router.put("/companies/:id/approve", approveCompany);
router.put("/companies/:id/reject", rejectCompany);

router.get("/users", getAllUsers);

router.get("/activity-log", getActivityLog);

module.exports = router;
