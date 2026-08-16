const SPORTS_API_BASE_URL =
  process.env.SPORTS_API_BASE_URL || "https://www.thesportsdb.com/api/v1/json";

const SPORTS_API_KEY = process.env.SPORTS_API_KEY || "123";

/**
 * Build TheSportsDB API URL
 */
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

/**
 * Generic request function
 */
const requestSportsApi = async (endpoint, params = {}) => {
  const url = buildUrl(endpoint, params);

  console.log("Sports API:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sports API request failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * ==========================================
 * SPORTS
 * ==========================================
 */

/**
 * Get all sports
 */
const getAllSports = async () => {
  return requestSportsApi("all_sports.php");
};

/**
 * ==========================================
 * LEAGUES
 * ==========================================
 */

/**
 * Get leagues
 *
 * Optional:
 * sport
 * country
 */
const getLeagues = async ({ sport, country } = {}) => {
  return requestSportsApi("search_all_leagues.php", {
    s: sport,
    c: country,
  });
};

/**
 * Get league details
 */
const getLeagueById = async (leagueId) => {
  return requestSportsApi("lookupleague.php", {
    id: leagueId,
  });
};

/**
 * Get upcoming league events
 */
const getLeagueUpcomingEvents = async (leagueId) => {
  return requestSportsApi("eventsnextleague.php", {
    id: leagueId,
  });
};

/**
 * Get previous league events
 */
const getLeaguePastEvents = async (leagueId) => {
  return requestSportsApi("eventspastleague.php", {
    id: leagueId,
  });
};

/**
 * ==========================================
 * TEAMS
 * ==========================================
 */

/**
 * Get teams
 *
 * Optional:
 * league
 * sport
 * country
 */
const getTeams = async ({ league, sport, country } = {}) => {
  return requestSportsApi("search_all_teams.php", {
    l: league,
    s: sport,
    c: country,
  });
};

/**
 * Get team details
 */
const getTeamById = async (teamId) => {
  return requestSportsApi("lookupteam.php", {
    id: teamId,
  });
};

/**
 * ==========================================
 * EVENTS
 * ==========================================
 */

/**
 * Get event details
 */
const getEventById = async (eventId) => {
  return requestSportsApi("lookupevent.php", {
    id: eventId,
  });
};

module.exports = {
  getAllSports,

  getLeagues,
  getLeagueById,
  getLeagueUpcomingEvents,
  getLeaguePastEvents,

  getTeams,
  getTeamById,

  getEventById,
};
