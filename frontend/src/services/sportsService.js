import axios from "axios";

/*
|--------------------------------------------------------------------------
| TheSportsDB
|--------------------------------------------------------------------------
|
| Used for:
| - Sports categories
| - Leagues
| - Teams
| - League events
| - Event details
| - League standings (Sprint 3)
|
|--------------------------------------------------------------------------
*/

const API_KEY = "123";

const SPORTS_DB_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

const sportsApi = axios.create({
  baseURL: SPORTS_DB_URL,
  timeout: 15000,
});

/*
|--------------------------------------------------------------------------
| ESPN SCOREBOARD API
|--------------------------------------------------------------------------
|
| Used for:
| - Live matches
| - Today's matches
| - Upcoming matches
|
| ESPN does not require an API key for these public scoreboard endpoints.
|
|--------------------------------------------------------------------------
*/

const ESPN_URLS = [
  {
    name: "Football",
    icon: "⚽",
    sport: "football",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  },

  {
    name: "College Football",
    icon: "🏈",
    sport: "football",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",
  },

  {
    name: "Soccer",
    icon: "⚽",
    sport: "soccer",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
  },

  {
    name: "MLS",
    icon: "⚽",
    sport: "soccer",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard",
  },

  {
    name: "NBA",
    icon: "🏀",
    sport: "basketball",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
  },

  {
    name: "WNBA",
    icon: "🏀",
    sport: "basketball",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard",
  },

  {
    name: "NCAA Basketball",
    icon: "🏀",
    sport: "basketball",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard",
  },

  {
    name: "MLB",
    icon: "⚾",
    sport: "baseball",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
  },

  {
    name: "NHL",
    icon: "🏒",
    sport: "hockey",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
  },

  {
    name: "Tennis",
    icon: "🎾",
    sport: "tennis",
    url: "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard",
  },

  {
    name: "Golf",
    icon: "⛳",
    sport: "golf",
    url: "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard",
  },
];

/*
|--------------------------------------------------------------------------
| DATE
|--------------------------------------------------------------------------
*/

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

/*
|--------------------------------------------------------------------------
| NORMALIZE SPORT
|--------------------------------------------------------------------------
*/

const SPORT_MAPPING = {
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
  golf: "Golf",
  handball: "Handball",
  boxing: "Boxing",
  wrestling: "Wrestling",
  motorsport: "Motorsport",
  formula1: "Motorsport",
};

const normalizeSport = (sport) => {
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
| THE SPORT DB
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GET SPORTS
|--------------------------------------------------------------------------
*/

export const getSports = async () => {
  const response = await sportsApi.get("/all_sports.php");

  return response.data?.sports || [];
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
  const response = await sportsApi.get("/all_leagues.php");

  return response.data?.leagues || [];
};

/*
|--------------------------------------------------------------------------
| GET LEAGUES
|--------------------------------------------------------------------------
*/

export const getLeagues = async (sport) => {
  const normalizedSport = normalizeSport(sport);

  if (!normalizedSport) {
    return [];
  }

  const response = await sportsApi.get("/search_all_leagues.php", {
    params: {
      s: normalizedSport,
    },
  });

  return response.data?.countries || response.data?.leagues || [];
};

export const getLeaguesBySport = async (sport) => {
  return getLeagues(sport);
};

/*
|--------------------------------------------------------------------------
| GET LEAGUE
|--------------------------------------------------------------------------
*/

export const getLeagueById = async (id) => {
  if (!id) {
    return null;
  }

  const response = await sportsApi.get("/lookupleague.php", {
    params: {
      id,
    },
  });

  return response.data?.leagues?.[0] || null;
};

/*
|--------------------------------------------------------------------------
| LEAGUE STANDINGS (Sprint 3)
|--------------------------------------------------------------------------
|
| TheSportsDB's lookuptable.php needs a season string, e.g. "2023-2024".
| If no season is passed, we try the league's own strCurrentSeason first.
|
|--------------------------------------------------------------------------
*/

export const getLeagueStandings = async (leagueId, season) => {
  if (!leagueId) {
    return [];
  }

  let seasonToUse = season;

  if (!seasonToUse) {
    const league = await getLeagueById(leagueId);
    seasonToUse = league?.strCurrentSeason || `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`;
  }

  const response = await sportsApi.get("/lookuptable.php", {
    params: {
      l: leagueId,
      s: seasonToUse,
    },
  });

  return response.data?.table || [];
};

/*
|--------------------------------------------------------------------------
| TEAMS
|--------------------------------------------------------------------------
*/

export const getTeamsByLeague = async (leagueName) => {
  if (!leagueName) {
    return [];
  }

  const response = await sportsApi.get("/search_all_teams.php", {
    params: {
      l: leagueName,
    },
  });

  return response.data?.teams || [];
};

/*
|--------------------------------------------------------------------------
| GET TEAM
|--------------------------------------------------------------------------
*/

export const getTeamById = async (id) => {
  if (!id) {
    return null;
  }

  const response = await sportsApi.get("/lookupteam.php", {
    params: {
      id,
    },
  });

  return response.data?.teams?.[0] || null;
};

/*
|--------------------------------------------------------------------------
| GET EVENT
|--------------------------------------------------------------------------
*/

export const getEventById = async (id) => {
  if (!id) {
    return null;
  }

  const response = await sportsApi.get("/lookupevent.php", {
    params: {
      id,
    },
  });

  return response.data?.events?.[0] || null;
};

/*
|--------------------------------------------------------------------------
| LEAGUE EVENTS
|--------------------------------------------------------------------------
*/

export const getLeagueUpcomingEvents = async (leagueId) => {
  if (!leagueId) {
    return [];
  }

  const response = await sportsApi.get("/eventsnextleague.php", {
    params: {
      id: leagueId,
    },
  });

  return response.data?.events || [];
};

export const getNextLeagueEvents = async (leagueId) => {
  return getLeagueUpcomingEvents(leagueId);
};

export const getLeagueNextEvents = async (leagueId) => {
  return getLeagueUpcomingEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| PAST EVENTS
|--------------------------------------------------------------------------
*/

export const getLeaguePastEvents = async (leagueId) => {
  if (!leagueId) {
    return [];
  }

  const response = await sportsApi.get("/eventspastleague.php", {
    params: {
      id: leagueId,
    },
  });

  return response.data?.events || [];
};

export const getPastLeagueEvents = async (leagueId) => {
  return getLeaguePastEvents(leagueId);
};

/*
|--------------------------------------------------------------------------
| TEAM EVENTS
|--------------------------------------------------------------------------
*/

export const getNextTeamEvents = async (teamId) => {
  if (!teamId) {
    return [];
  }

  const response = await sportsApi.get("/eventsnext.php", {
    params: {
      id: teamId,
    },
  });

  return response.data?.events || [];
};

export const getPastTeamEvents = async (teamId) => {
  if (!teamId) {
    return [];
  }

  const response = await sportsApi.get("/eventslast.php", {
    params: {
      id: teamId,
    },
  });

  return response.data?.results || response.data?.events || [];
};

/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

export const searchTeam = async (teamName) => {
  if (!teamName) {
    return [];
  }

  const response = await sportsApi.get("/searchteams.php", {
    params: {
      t: teamName,
    },
  });

  return response.data?.teams || [];
};

export const searchLeague = async (leagueName) => {
  if (!leagueName) {
    return [];
  }

  const response = await sportsApi.get("/search_all_leagues.php", {
    params: {
      l: leagueName,
    },
  });

  return response.data?.countries || response.data?.leagues || [];
};

/*
|--------------------------------------------------------------------------
| ESPN EVENT NORMALIZER
|--------------------------------------------------------------------------
*/

const normalizeESPNEvent = (event, source) => {
  const competition = event?.competitions?.[0] || {};

  const competitors = competition?.competitors || [];

  const home = competitors.find((team) => team.homeAway === "home") || {};

  const away = competitors.find((team) => team.homeAway === "away") || {};

  const status = competition?.status || event?.status || {};

  const state = status?.type?.state || "pre";

  let normalizedStatus = "UPCOMING";

  if (state === "in") {
    normalizedStatus = "LIVE";
  }

  if (state === "post") {
    normalizedStatus = "FINISHED";
  }

  return {
    id: event?.id,

    name:
      event?.name ||
      `${away?.team?.displayName || "Away"} vs ${
        home?.team?.displayName || "Home"
      }`,

    shortName:
      event?.shortName ||
      `${away?.team?.abbreviation || "AWY"} vs ${
        home?.team?.abbreviation || "HOM"
      }`,

    sport: source?.sport,

    sportName: source?.name,

    icon: source?.icon,

    league:
      event?.league?.name ||
      event?.season?.name ||
      event?.competitions?.[0]?.league?.name ||
      source?.name,

    venue: competition?.venue?.fullName || "",

    date: event?.date || competition?.date || null,

    status: normalizedStatus,

    statusText:
      status?.type?.shortDetail ||
      status?.type?.detail ||
      status?.type?.description ||
      normalizedStatus,

    clock: status?.displayClock || null,

    period: status?.period || null,

    homeTeam: {
      id: home?.team?.id,
      name: home?.team?.displayName || home?.team?.shortDisplayName || "Home",

      abbreviation: home?.team?.abbreviation || "",

      logo: home?.team?.logo || null,

      score: home?.score ?? "0",
    },

    awayTeam: {
      id: away?.team?.id,
      name: away?.team?.displayName || away?.team?.shortDisplayName || "Away",

      abbreviation: away?.team?.abbreviation || "",

      logo: away?.team?.logo || null,

      score: away?.score ?? "0",
    },

    link:
      event?.links?.find((link) => link.rel?.includes("summary"))?.href ||
      event?.links?.[0]?.href ||
      null,

    source: "ESPN",
  };
};

/*
|--------------------------------------------------------------------------
| GET ESPN EVENTS FROM ONE LEAGUE
|--------------------------------------------------------------------------
*/

const getESPNEvents = async (source) => {
  try {
    const today = getToday();

    const response = await axios.get(source.url, {
      params: {
        dates: today,
        limit: 100,
      },

      timeout: 15000,
    });

    const events = response.data?.events || [];

    return events.map((event) => normalizeESPNEvent(event, source));
  } catch (error) {
    console.error(`ESPN ${source.name} ERROR:`, error?.message);

    return [];
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL LIVE MATCHES
|--------------------------------------------------------------------------
*/

export const getLiveMatches = async () => {
  const results = await Promise.all(
    ESPN_URLS.map((source) => getESPNEvents(source)),
  );

  const events = results.flat().filter((event) => event.status === "LIVE");

  return removeDuplicateEvents(events);
};

/*
|--------------------------------------------------------------------------
| GET TODAY'S MATCHES
|--------------------------------------------------------------------------
*/

export const getTodayMatches = async () => {
  const results = await Promise.all(
    ESPN_URLS.map((source) => getESPNEvents(source)),
  );

  const events = results.flat();

  return removeDuplicateEvents(events).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
};

/*
|--------------------------------------------------------------------------
| GET UPCOMING MATCHES
|--------------------------------------------------------------------------
*/

export const getUpcomingMatches = async () => {
  const todayMatches = await getTodayMatches();

  return todayMatches.filter((event) => event.status === "UPCOMING");
};

/*
|--------------------------------------------------------------------------
| REMOVE DUPLICATES
|--------------------------------------------------------------------------
*/

const removeDuplicateEvents = (events) => {
  const map = new Map();

  events.forEach((event) => {
    if (!event?.id) {
      return;
    }

    map.set(event.id, event);
  });

  return Array.from(map.values());
};

/*
|--------------------------------------------------------------------------
| REFRESH LIVE MATCHES
|--------------------------------------------------------------------------
|
| Call this every 30 seconds from the Sports page.
|
|--------------------------------------------------------------------------
*/

export const startLiveScorePolling = (callback, interval = 30000) => {
  let stopped = false;

  const run = async () => {
    if (stopped) {
      return;
    }

    try {
      const matches = await getLiveMatches();

      if (!stopped) {
        callback(matches);
      }
    } catch (error) {
      console.error("Live score polling error:", error);
    }
  };

  run();

  const timer = setInterval(run, interval);

  return () => {
    stopped = true;
    clearInterval(timer);
  };
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
  getLeagueStandings,
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
  getTodayMatches,
  getUpcomingMatches,
  startLiveScorePolling,
};
