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
| Sport Mapping
|--------------------------------------------------------------------------
*/

const SPORT_MAPPING = {
  football: "Soccer",
  soccer: "Soccer",

  cricket: "Cricket",

  basketball: "Basketball",

  tennis: "Tennis",

  baseball: "Baseball",

  rugby: "Rugby",

  golf: "Golf",

  hockey: "Ice Hockey",

  volleyball: "Volleyball",

  handball: "Handball",

  boxing: "Boxing",

  wrestling: "Wrestling",

  motorsport: "Motorsport",

  formula1: "Motorsport",
};

/*
|--------------------------------------------------------------------------
| Normalize Sport
|--------------------------------------------------------------------------
*/

const normalizeSport = (sport) => {
  /*
  If an object is accidentally passed:
  
  {
    sport: "Basketball"
  }
  */

  if (typeof sport === "object" && sport !== null) {
    sport = sport.sport || sport.name || sport.strSport || "";
  }

  if (!sport) {
    return "";
  }

  const value = sport.toString().trim().toLowerCase();

  return SPORT_MAPPING[value] || sport.toString().trim();
};

/*
|--------------------------------------------------------------------------
| GET SPORTS
|--------------------------------------------------------------------------
*/

export const getSports = async () => {
  try {
    const response = await sportsApi.get("/all_sports.php");

    console.log("GET SPORTS:", response.data);

    return response.data?.sports || [];
  } catch (error) {
    console.error("GET SPORTS ERROR:", error);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET SPORTS CATEGORIES
|--------------------------------------------------------------------------
*/

export const getSportsCategories = async () => {
  return getSports();
};

/*
|--------------------------------------------------------------------------
| GET ALL LEAGUES
|--------------------------------------------------------------------------
*/

export const getAllLeagues = async () => {
  try {
    const response = await sportsApi.get("/all_leagues.php");

    console.log("GET ALL LEAGUES:", response.data);

    return response.data?.leagues || [];
  } catch (error) {
    console.error("GET ALL LEAGUES ERROR:", error);

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
    console.log("Loading leagues for:", sport);

    /*
      --------------------------------------------------------------
      Normalize object/string
      --------------------------------------------------------------
      */

    const normalizedSport = normalizeSport(sport);

    console.log("SPORT SELECTED:", {
      sport: normalizedSport,
    });

    if (!normalizedSport) {
      console.warn("No sport supplied.");

      return [];
    }

    console.log("SPORT SENT TO API:", {
      sport: normalizedSport,
    });

    /*
      --------------------------------------------------------------
      IMPORTANT
      --------------------------------------------------------------
      
      Use params:
      
      {
        s: "Basketball"
      }
      
      NOT:
      
      {
        sport]: "Basketball"
      }
      
      --------------------------------------------------------------
      */

    const response = await sportsApi.get("/search_all_leagues.php", {
      params: {
        s: normalizedSport,
      },
    });

    console.log("LEAGUE API RESPONSE:", response.data);

    const leagues = response.data?.countries || response.data?.leagues || [];

    console.log("LEAGUES FOUND:", leagues.length);

    return leagues;
  } catch (error) {
    console.error("GET LEAGUES ERROR:", error);

    if (error.response) {
      console.error("STATUS:", error.response.status);

      console.error("DATA:", error.response.data);
    }

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
      return null;
    }

    const response = await sportsApi.get("/lookupleague.php", {
      params: {
        id: id,
      },
    });

    console.log("LEAGUE DETAILS:", response.data);

    return response.data?.leagues?.[0] || null;
  } catch (error) {
    console.error("GET LEAGUE ERROR:", error);

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

    console.log("TEAMS RESPONSE:", response.data);

    return response.data?.teams || [];
  } catch (error) {
    console.error("GET TEAMS ERROR:", error);

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
      return null;
    }

    const response = await sportsApi.get("/lookupteam.php", {
      params: {
        id: id,
      },
    });

    return response.data?.teams?.[0] || null;
  } catch (error) {
    console.error("GET TEAM ERROR:", error);

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
      return null;
    }

    const response = await sportsApi.get("/lookupevent.php", {
      params: {
        id: id,
      },
    });

    console.log("EVENT DETAILS:", response.data);

    return response.data?.events?.[0] || null;
  } catch (error) {
    console.error("GET EVENT ERROR:", error);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| UPCOMING LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

export const getLeagueUpcomingEvents = async (leagueId) => {
  try {
    if (!leagueId) {
      return [];
    }

    const response = await sportsApi.get("/eventsnextleague.php", {
      params: {
        id: leagueId,
      },
    });

    console.log("UPCOMING LEAGUE EVENTS:", response.data);

    return response.data?.events || [];
  } catch (error) {
    console.error("UPCOMING LEAGUE EVENTS ERROR:", error);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| NEXT LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

export const getNextLeagueEvents = async (leagueId) => {
  return getLeagueUpcomingEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| LEAGUE NEXT EVENTS
|--------------------------------------------------------------------------
*/

export const getLeagueNextEvents = async (leagueId) => {
  return getLeagueUpcomingEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| PAST LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

export const getLeaguePastEvents = async (leagueId) => {
  try {
    if (!leagueId) {
      return [];
    }

    const response = await sportsApi.get("/eventspastleague.php", {
      params: {
        id: leagueId,
      },
    });

    console.log("PAST LEAGUE EVENTS:", response.data);

    return response.data?.events || [];
  } catch (error) {
    console.error("PAST LEAGUE EVENTS ERROR:", error);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| PAST LEAGUE EVENTS ALIAS
|--------------------------------------------------------------------------
*/

export const getPastLeagueEvents = async (leagueId) => {
  return getLeaguePastEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| NEXT TEAM EVENTS
|--------------------------------------------------------------------------
*/

export const getNextTeamEvents = async (teamId) => {
  try {
    if (!teamId) {
      return [];
    }

    const response = await sportsApi.get("/eventsnext.php", {
      params: {
        id: teamId,
      },
    });

    return response.data?.events || [];
  } catch (error) {
    console.error("GET NEXT TEAM EVENTS ERROR:", error);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| PAST TEAM EVENTS
|--------------------------------------------------------------------------
*/

export const getPastTeamEvents = async (teamId) => {
  try {
    if (!teamId) {
      return [];
    }

    const response = await sportsApi.get("/eventslast.php", {
      params: {
        id: teamId,
      },
    });

    return response.data?.results || response.data?.events || [];
  } catch (error) {
    console.error("GET PAST TEAM EVENTS ERROR:", error);

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

    return response.data?.teams || [];
  } catch (error) {
    console.error("SEARCH TEAM ERROR:", error);

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

    return response.data?.countries || response.data?.leagues || [];
  } catch (error) {
    console.error("SEARCH LEAGUE ERROR:", error);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| LIVE MATCHES
|--------------------------------------------------------------------------
|
| Free TheSportsDB key does not provide
| reliable live-score data.
|
*/

export const getLiveMatches = async () => {
  console.warn("Live matches require TheSportsDB V2/Premium.");

  return [];
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

  getLeagueUpcomingEvents,

  getNextLeagueEvents,

  getLeagueNextEvents,

  getLeaguePastEvents,

  getPastLeagueEvents,

  getNextTeamEvents,

  getPastTeamEvents,

  searchTeam,

  searchLeague,

  getLiveMatches,
};
