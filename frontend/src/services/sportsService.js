import API from "./api";

/**
 * Get all sports
 */
export const getSportsCategories = async () => {
  const response = await API.get("/sports/categories");

  return response.data.data || [];
};

/**
 * Get leagues
 */
export const getLeagues = async ({ sport = "", country = "" } = {}) => {
  const response = await API.get("/sports/leagues", {
    params: {
      sport,
      country,
    },
  });

  return response.data.data || [];
};

/**
 * Get league details
 */
export const getLeagueById = async (leagueId) => {
  const response = await API.get(`/sports/leagues/${leagueId}`);

  return response.data.data;
};

/**
 * Get upcoming league events
 */
export const getLeagueUpcomingEvents = async (leagueId) => {
  const response = await API.get(`/sports/leagues/${leagueId}/events/upcoming`);

  return response.data.data || [];
};

/**
 * Get previous league events
 */
export const getLeaguePastEvents = async (leagueId) => {
  const response = await API.get(`/sports/leagues/${leagueId}/events/past`);

  return response.data.data || [];
};

/**
 * Get teams
 */
export const getTeams = async ({
  league = "",
  sport = "",
  country = "",
} = {}) => {
  const response = await API.get("/sports/teams", {
    params: {
      league,
      sport,
      country,
    },
  });

  return response.data.data || [];
};

/**
 * Get team details
 */
export const getTeamById = async (teamId) => {
  const response = await API.get(`/sports/teams/${teamId}`);

  return response.data.data;
};

/**
 * Get match details
 */
export const getEventById = async (eventId) => {
  const response = await API.get(`/sports/events/${eventId}`);

  return response.data.data;
};
