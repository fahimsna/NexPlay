const express = require("express");

const {
  getSportsCategories,
  getLeagues,
  getLeagueById,
  getTeams,
  getTeamById,
  getEventById,
} = require("../controllers/sportsController");

const router = express.Router();

/*
 * Sports Categories
 * GET /api/sports/categories
 */
router.get("/categories", getSportsCategories);

/*
 * Tournament / League Explorer
 * GET /api/sports/leagues
 */
router.get("/leagues", getLeagues);

/*
 * League Details
 * GET /api/sports/leagues/:id
 */
router.get("/leagues/:id", getLeagueById);

/*
 * Team Explorer
 * GET /api/sports/teams
 */
router.get("/teams", getTeams);

/*
 * Team Details
 * GET /api/sports/teams/:id
 */
router.get("/teams/:id", getTeamById);

/*
 * Match Details
 * GET /api/sports/events/:id
 */
router.get("/events/:id", getEventById);

module.exports = router;
