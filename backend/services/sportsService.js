const SPORTS_API_BASE_URL =
  process.env.SPORTS_API_BASE_URL || "https://www.thesportsdb.com/api/v1/json";

const SPORTS_API_KEY = process.env.SPORTS_API_KEY || "123";

/**
 * Build a TheSportsDB API URL.
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
 * Generic request helper.
 */
const requestSportsApi = async (endpoint, params = {}) => {
  const url = buildUrl(endpoint, params);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sports API request failed with status ${response.status}`);
  }

  const data = await response.json();

  return data;
};

/**
 * Get all sports categories.
 */
const getAllSports = async () => {
  return requestSportsApi("all_sports.php");
};

/**
 * Get leagues.
 *
 * Optional:
 * - sport
 * - country
 */
const getLeagues = async ({ sport, country } = {}) => {
  return requestSportsApi("search_all_leagues.php", {
    s: sport,
    c: country,
  });
};

/**
 * Get a single league by ID.
 */
const getLeagueById = async (leagueId) => {
  return requestSportsApi("lookupleague.php", {
    id: leagueId,
  });
};

/**
 * Get teams for a league.
 *
 * Optional:
 * - league
 * - sport
 * - country
 */
const getTeams = async ({ league, sport, country } = {}) => {
  return requestSportsApi("search_all_teams.php", {
    l: league,
    s: sport,
    c: country,
  });
};

/**
 * Get a single team by ID.
 */
const getTeamById = async (teamId) => {
  return requestSportsApi("lookupteam.php", {
    id: teamId,
  });
};

/**
 * Get a single event/match by ID.
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
  getTeams,
  getTeamById,
  getEventById,
};
