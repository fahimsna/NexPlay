const express = require("express");

const router = express.Router();

const {
  getMyUpcomingContent,

  addUpcomingContent,

  updateUpcomingContent,

  deleteUpcomingContent,
} = require("../controllers/upcomingController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const { ROLES } = require("../config/roles");

router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  getMyUpcomingContent,
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  addUpcomingContent,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  updateUpcomingContent,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  deleteUpcomingContent,
);

module.exports = router;
