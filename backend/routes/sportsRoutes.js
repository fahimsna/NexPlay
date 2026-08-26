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

/*
|--------------------------------------------------------------------------
| SPORTS
|--------------------------------------------------------------------------
*/

router.get("/categories", getSportsCategories);

/*
|--------------------------------------------------------------------------
| LEAGUES
|--------------------------------------------------------------------------
*/

router.get("/leagues", getLeagues);

router.get("/leagues/:id", getLeagueById);

/*
|--------------------------------------------------------------------------
| LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

router.get("/leagues/:id/events/upcoming", getLeagueUpcomingEvents);

router.get("/leagues/:id/events/past", getLeaguePastEvents);

/*
|--------------------------------------------------------------------------
| TEAMS
|--------------------------------------------------------------------------
*/

router.get("/teams", getTeams);

router.get("/teams/:id", getTeamById);

/*
|--------------------------------------------------------------------------
| MATCHES
|--------------------------------------------------------------------------
*/

router.get("/events/:id", getEventById);

module.exports = router;
