const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { ROLES } = require("../config/roles");

const {
  createUpcoming,
  getUpcoming,
  getMyUpcoming,
  updateUpcoming,
  deleteUpcoming,
} = require("../controllers/upcomingController");

// =======================
// COMPANY
// =======================

// Get upcoming releases created by the logged-in company
router.get(
  "/my",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  getMyUpcoming,
);

// Create an upcoming release
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  createUpcoming,
);

// Update an upcoming release
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  updateUpcoming,
);

// Delete an upcoming release
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  deleteUpcoming,
);

// =======================
// PUBLIC
// =======================

// Get all upcoming releases
router.get("/", getUpcoming);

module.exports = router;