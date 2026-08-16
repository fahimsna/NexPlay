const SPORTS_API_BASE_URL =
  process.env.SPORTS_API_BASE_URL || "https://www.thesportsdb.com/api/v1/json";

const SPORTS_API_KEY = process.env.SPORTS_API_KEY || "123";

/*
|--------------------------------------------------------------------------
| Build API URL
|--------------------------------------------------------------------------
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

/*
|--------------------------------------------------------------------------
| Generic API Request
|--------------------------------------------------------------------------
*/

const requestSportsApi = async (endpoint, params = {}) => {
  const url = buildUrl(endpoint, params);

  console.log("Sports API Request:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sports API request failed with status ${response.status}`);
  }

  return response.json();
};

/*
|--------------------------------------------------------------------------
| Normalize sport names
|--------------------------------------------------------------------------
|
| Frontend:
| Football
|
| TheSportsDB:
| Soccer
|
|--------------------------------------------------------------------------
*/

const normalizeSport = (sport) => {
  if (!sport) {
    return sport;
  }

  const normalized = sport.trim().toLowerCase();

  const sportMap = {
    football: "Soccer",
    soccer: "Soccer",
    cricket: "Cricket",
    basketball: "Basketball",
    tennis: "Tennis",
    baseball: "Baseball",
    volleyball: "Volleyball",
    hockey: "Ice Hockey",
    "ice hockey": "Ice Hockey",
    rugby: "Rugby",
    motorsport: "Motorsport",
  };

  return sportMap[normalized] || sport;
};

/*
|--------------------------------------------------------------------------
| SPORTS CATEGORIES
|--------------------------------------------------------------------------
*/

/**
 * Get all sports
 */
const getAllSports = async () => {
  return requestSportsApi("all_sports.php");
};

/*
|--------------------------------------------------------------------------
| LEAGUES
|--------------------------------------------------------------------------
*/

/**
 * Get leagues
 *
 * Optional:
 * sport
 * country
 */
const getLeagues = async ({ sport, country } = {}) => {
  const apiSport = normalizeSport(sport);

  console.log("Requested sport:", sport);

  console.log("Normalized API sport:", apiSport);

  return requestSportsApi("search_all_leagues.php", {
    s: apiSport,
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

/*
|--------------------------------------------------------------------------
| TEAMS
|--------------------------------------------------------------------------
*/

/**
 * Get teams by league
 */
const getTeams = async ({ league, sport, country } = {}) => {
  const apiSport = normalizeSport(sport);

  return requestSportsApi("search_all_teams.php", {
    l: league,
    s: apiSport,
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

/*
|--------------------------------------------------------------------------
| EVENTS / MATCHES
|--------------------------------------------------------------------------
*/

/**
 * Get event / match details
 */
const getEventById = async (eventId) => {
  return requestSportsApi("lookupevent.php", {
    id: eventId,
  });
};

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

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
