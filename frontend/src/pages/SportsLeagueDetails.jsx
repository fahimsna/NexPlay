import axios from "axios";

/*
|--------------------------------------------------------------------------
| TheSportsDB Configuration
|--------------------------------------------------------------------------
*/

const API_KEY = "123";

const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
*/

const sportsApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

/*
|--------------------------------------------------------------------------
| SPORT MAPPING
|--------------------------------------------------------------------------
*/

const SPORT_MAPPING = {
  football: "soccer",
  soccer: "soccer",

  cricket: "cricket",

  basketball: "basketball",

  tennis: "tennis",

  baseball: "baseball",

  rugby: "rugby",

  golf: "golf",

  hockey: "hockey",

  volleyball: "volleyball",

  handball: "handball",

  boxing: "boxing",

  wrestling: "wrestling",

  motorsport: "motorsport",

  formula1: "motorsport",
};

/*
|--------------------------------------------------------------------------
| NORMALIZE SPORT
|--------------------------------------------------------------------------
*/

const normalizeSport = (sport) => {
  if (!sport) {
    return "";
  }

  const value = sport.toString().trim().toLowerCase();

  return SPORT_MAPPING[value] || value;
};

/*
|--------------------------------------------------------------------------
| GET SPORTS
|--------------------------------------------------------------------------
*/

export const getSports = async () => {
  try {
    const response = await sportsApi.get("/all_sports.php");

    console.log("Sports API Response:", response.data);

    return response.data?.sports || [];
  } catch (error) {
    console.error("getSports error:", error.response?.data || error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET SPORTS CATEGORIES
|--------------------------------------------------------------------------
*/

export const getSportsCategories = async () => {
  try {
    const response = await sportsApi.get("/all_sports.php");

    console.log("Sports Categories Response:", response.data);

    return response.data?.sports || [];
  } catch (error) {
    console.error(
      "getSportsCategories error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL LEAGUES
|--------------------------------------------------------------------------
*/

export const getAllLeagues = async () => {
  try {
    const response = await sportsApi.get("/all_leagues.php");

    console.log("All Leagues Response:", response.data);

    const leagues = response.data?.leagues || [];

    console.log("Total leagues:", leagues.length);

    return leagues;
  } catch (error) {
    console.error(
      "getAllLeagues error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET LEAGUES
|--------------------------------------------------------------------------
*/

export const getLeagues = async (sport) => {
  try {
    if (!sport) {
      return [];
    }

    const apiSport = normalizeSport(sport);

    console.log("=================================");

    console.log("Selected sport:", sport);

    console.log("Normalized sport:", apiSport);

    const allLeagues = await getAllLeagues();

    const filteredLeagues = allLeagues.filter((league) => {
      const leagueSport = league.strSport?.toString().trim().toLowerCase();

      return leagueSport === apiSport;
    });

    console.log("Leagues found:", filteredLeagues);

    console.log("League count:", filteredLeagues.length);

    console.log("=================================");

    return filteredLeagues;
  } catch (error) {
    console.error("getLeagues error:", error.response?.data || error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET LEAGUES BY SPORT
|--------------------------------------------------------------------------
*/

export const getLeaguesBySport = async (sport) => {
  return getLeagues(sport);
};

/*
|--------------------------------------------------------------------------
| GET LEAGUE BY ID
|--------------------------------------------------------------------------
*/

export const getLeagueById = async (id) => {
  try {
    if (!id) {
      throw new Error("League ID is required");
    }

    const response = await sportsApi.get(`/lookupleague.php?id=${id}`);

    console.log("League Details Response:", response.data);

    return response.data?.leagues?.[0] || null;
  } catch (error) {
    console.error(
      "getLeagueById error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET TEAMS BY LEAGUE
|--------------------------------------------------------------------------
*/

export const getTeamsByLeague = async (leagueName) => {
  try {
    if (!leagueName) {
      return [];
    }

    const response = await sportsApi.get("/search_all_teams.php", {
      params: {
        l: leagueName,
      },
    });

    console.log("Teams Response:", response.data);

    return response.data?.teams || [];
  } catch (error) {
    console.error(
      "getTeamsByLeague error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET TEAM BY ID
|--------------------------------------------------------------------------
*/

export const getTeamById = async (id) => {
  try {
    if (!id) {
      throw new Error("Team ID is required");
    }

    const response = await sportsApi.get(`/lookupteam.php?id=${id}`);

    console.log("Team Details Response:", response.data);

    return response.data?.teams?.[0] || null;
  } catch (error) {
    console.error("getTeamById error:", error.response?.data || error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET EVENT BY ID
|--------------------------------------------------------------------------
*/

export const getEventById = async (id) => {
  try {
    if (!id) {
      throw new Error("Event ID is required");
    }

    const response = await sportsApi.get(`/lookupevent.php?id=${id}`);

    console.log("Event Details Response:", response.data);

    return response.data?.events?.[0] || null;
  } catch (error) {
    console.error("getEventById error:", error.response?.data || error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET NEXT LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

export const getNextLeagueEvents = async (leagueId) => {
  try {
    if (!leagueId) {
      return [];
    }

    const response = await sportsApi.get(
      `/eventsnextleague.php?id=${leagueId}`,
    );

    console.log("Next League Events Response:", response.data);

    return response.data?.events || [];
  } catch (error) {
    console.error(
      "getNextLeagueEvents error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET LEAGUE UPCOMING EVENTS
|--------------------------------------------------------------------------
|
| Required by SportsLeagueDetails.jsx
|
*/

export const getLeagueUpcomingEvents = async (leagueId) => {
  return getNextLeagueEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| GET LEAGUE NEXT EVENTS
|--------------------------------------------------------------------------
*/

export const getLeagueNextEvents = async (leagueId) => {
  return getNextLeagueEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| GET PAST LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

export const getPastLeagueEvents = async (leagueId) => {
  try {
    if (!leagueId) {
      return [];
    }

    const response = await sportsApi.get(
      `/eventspastleague.php?id=${leagueId}`,
    );

    console.log("Past League Events Response:", response.data);

    return response.data?.events || [];
  } catch (error) {
    console.error(
      "getPastLeagueEvents error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET LEAGUE PAST EVENTS
|--------------------------------------------------------------------------
*/

export const getLeaguePastEvents = async (leagueId) => {
  return getPastLeagueEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| GET NEXT TEAM EVENTS
|--------------------------------------------------------------------------
*/

export const getNextTeamEvents = async (teamId) => {
  try {
    if (!teamId) {
      return [];
    }

    const response = await sportsApi.get(`/eventsnext.php?id=${teamId}`);

    console.log("Next Team Events Response:", response.data);

    return response.data?.events || [];
  } catch (error) {
    console.error(
      "getNextTeamEvents error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET PAST TEAM EVENTS
|--------------------------------------------------------------------------
*/

export const getPastTeamEvents = async (teamId) => {
  try {
    if (!teamId) {
      return [];
    }

    const response = await sportsApi.get(`/eventslast.php?id=${teamId}`);

    console.log("Past Team Events Response:", response.data);

    return response.data?.results || response.data?.events || [];
  } catch (error) {
    console.error(
      "getPastTeamEvents error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH TEAM
|--------------------------------------------------------------------------
*/

export const searchTeam = async (teamName) => {
  try {
    if (!teamName) {
      return [];
    }

    const response = await sportsApi.get("/searchteams.php", {
      params: {
        t: teamName,
      },
    });

    console.log("Search Team Response:", response.data);

    return response.data?.teams || [];
  } catch (error) {
    console.error("searchTeam error:", error.response?.data || error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH LEAGUE
|--------------------------------------------------------------------------
*/

export const searchLeague = async (leagueName) => {
  try {
    if (!leagueName) {
      return [];
    }

    const response = await sportsApi.get("/search_all_leagues.php", {
      params: {
        l: leagueName,
      },
    });

    console.log("Search League Response:", response.data);

    return response.data?.countries || response.data?.leagues || [];
  } catch (error) {
    console.error("searchLeague error:", error.response?.data || error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| DEFAULT EXPORT
|--------------------------------------------------------------------------
*/

export default {
  getSports,
  getSportsCategories,

  getAllLeagues,
  getLeagues,
  getLeaguesBySport,

  getLeagueById,

  getTeamsByLeague,
  getTeamById,

  getEventById,

  getNextLeagueEvents,
  getLeagueUpcomingEvents,
  getLeagueNextEvents,

  getPastLeagueEvents,
  getLeaguePastEvents,

  getNextTeamEvents,
  getPastTeamEvents,

  searchTeam,
  searchLeague,
};
