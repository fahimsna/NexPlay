const express = require("express");

const {
  getSportsCategories,

  getLeagues,
  getLeagueById,
  getLeagueUpcomingEvents,
  getLeaguePastEvents,

  getTeams,
  getTeamById,

  getEventById,
} = require("../controllers/sportsController");

const router = express.Router();

/**
 * Sports Categories
 */
router.get("/categories", getSportsCategories);

/**
 * League Explorer
 */
router.get("/leagues", getLeagues);

/**
 * League Details
 */
router.get("/leagues/:id", getLeagueById);

/**
 * Upcoming League Matches
 */
router.get("/leagues/:id/events/upcoming", getLeagueUpcomingEvents);

/**
 * Previous League Matches
 */
router.get("/leagues/:id/events/past", getLeaguePastEvents);

/**
 * Team Explorer
 */
router.get("/teams", getTeams);

/**
 * Team Details
 */
router.get("/teams/:id", getTeamById);

/**
 * Match Details
 */
router.get("/events/:id", getEventById);

module.exports = router;
