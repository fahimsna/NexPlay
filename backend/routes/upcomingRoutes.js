const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { ROLES } = require("../config/roles");

const {
  createUpcoming,
  getUpcoming,
  updateUpcoming,
  deleteUpcoming,
} = require("../controllers/upcomingController");

router.get("/", getUpcoming);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  createUpcoming,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  updateUpcoming,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  deleteUpcoming,
);

module.exports = router;