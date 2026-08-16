const sportsService = require("../services/sportsService");

/**
 * ==========================================
 * SPORTS CATEGORIES
 * GET /api/sports/categories
 * ==========================================
 */
const getSportsCategories = async (req, res) => {
  try {
    const data = await sportsService.getAllSports();

    res.status(200).json({
      success: true,
      data: data.sports || [],
    });
  } catch (error) {
    console.error("Get sports categories error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sports categories",
    });
  }
};

/**
 * ==========================================
 * LEAGUES
 * GET /api/sports/leagues
 * ==========================================
 */
const getLeagues = async (req, res) => {
  try {
    const { sport, country } = req.query;

    const data = await sportsService.getLeagues({
      sport,
      country,
    });

    res.status(200).json({
      success: true,
      data: data.leagues || [],
    });
  } catch (error) {
    console.error("Get leagues error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leagues",
    });
  }
};

/**
 * ==========================================
 * LEAGUE DETAILS
 * GET /api/sports/leagues/:id
 * ==========================================
 */
const getLeagueById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "League ID is required",
      });
    }

    const data = await sportsService.getLeagueById(id);

    const league = data.leagues?.[0] || null;

    if (!league) {
      return res.status(404).json({
        success: false,
        message: "League not found",
      });
    }

    res.status(200).json({
      success: true,
      data: league,
    });
  } catch (error) {
    console.error("Get league details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch league details",
    });
  }
};

/**
 * ==========================================
 * LEAGUE UPCOMING EVENTS
 * GET /api/sports/leagues/:id/events/upcoming
 * ==========================================
 */
const getLeagueUpcomingEvents = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "League ID is required",
      });
    }

    const data = await sportsService.getLeagueUpcomingEvents(id);

    res.status(200).json({
      success: true,
      data: data.events || [],
    });
  } catch (error) {
    console.error("Get upcoming league events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming league events",
    });
  }
};

/**
 * ==========================================
 * LEAGUE PAST EVENTS
 * GET /api/sports/leagues/:id/events/past
 * ==========================================
 */
const getLeaguePastEvents = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "League ID is required",
      });
    }

    const data = await sportsService.getLeaguePastEvents(id);

    res.status(200).json({
      success: true,
      data: data.events || [],
    });
  } catch (error) {
    console.error("Get past league events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch past league events",
    });
  }
};

/**
 * ==========================================
 * TEAMS
 * GET /api/sports/teams
 * ==========================================
 */
const getTeams = async (req, res) => {
  try {
    const { league, sport, country } = req.query;

    if (!league && !sport && !country) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one filter",
      });
    }

    const data = await sportsService.getTeams({
      league,
      sport,
      country,
    });

    res.status(200).json({
      success: true,
      data: data.teams || [],
    });
  } catch (error) {
    console.error("Get teams error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch teams",
    });
  }
};

/**
 * ==========================================
 * TEAM DETAILS
 * GET /api/sports/teams/:id
 * ==========================================
 */
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Team ID is required",
      });
    }

    const data = await sportsService.getTeamById(id);

    const team = data.teams?.[0] || null;

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Get team details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch team details",
    });
  }
};

/**
 * ==========================================
 * EVENT DETAILS
 * GET /api/sports/events/:id
 * ==========================================
 */
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const data = await sportsService.getEventById(id);

    const event = data.events?.[0] || null;

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Match/event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get event details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch match details",
    });
  }
};

module.exports = {
  getSportsCategories,

  getLeagues,
  getLeagueById,
  getLeagueUpcomingEvents,
  getLeaguePastEvents,

  getTeams,
  getTeamById,

  getEventById,
};
