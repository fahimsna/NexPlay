import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  getSportsCategories,
  getLeagues,
  getLiveMatches,
  getTodayMatches,
} from "../services/sportsService";

/*
|--------------------------------------------------------------------------
| MAIN SPORTS
|--------------------------------------------------------------------------
*/

const SPORTS = [
  {
    name: "Football",
    icon: "⚽",
    apiName: "Soccer",
  },

  {
    name: "Cricket",
    icon: "🏏",
    apiName: "Cricket",
  },

  {
    name: "Basketball",
    icon: "🏀",
    apiName: "Basketball",
  },

  {
    name: "Tennis",
    icon: "🎾",
    apiName: "Tennis",
  },

  {
    name: "Baseball",
    icon: "⚾",
    apiName: "Baseball",
  },

  {
    name: "Hockey",
    icon: "🏒",
    apiName: "Ice Hockey",
  },

  {
    name: "Volleyball",
    icon: "🏐",
    apiName: "Volleyball",
  },

  {
    name: "Rugby",
    icon: "🏉",
    apiName: "Rugby",
  },

  {
    name: "Golf",
    icon: "⛳",
    apiName: "Golf",
  },

  {
    name: "Handball",
    icon: "🤾",
    apiName: "Handball",
  },

  {
    name: "Boxing",
    icon: "🥊",
    apiName: "Boxing",
  },

  {
    name: "Motorsport",
    icon: "🏎️",
    apiName: "Motorsport",
  },
];

/*
|--------------------------------------------------------------------------
| FILTERS
|--------------------------------------------------------------------------
*/

const FILTERS = ["All", "Live", "Upcoming", "Finished"];

/*
|--------------------------------------------------------------------------
| SPORTS PAGE
|--------------------------------------------------------------------------
*/

function Sports() {
  const [apiSports, setApiSports] = useState([]);

  const [selectedSport, setSelectedSport] = useState("Football");

  const [leagues, setLeagues] = useState([]);

  const [liveMatches, setLiveMatches] = useState([]);

  const [todayMatches, setTodayMatches] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");

  const [loadingSports, setLoadingSports] = useState(true);

  const [loadingLeagues, setLoadingLeagues] = useState(false);

  const [loadingMatches, setLoadingMatches] = useState(true);

  const [error, setError] = useState("");

  const [leagueError, setLeagueError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD SPORTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadSports();
  }, []);

  const loadSports = async () => {
    try {
      setLoadingSports(true);

      setError("");

      const data = await getSportsCategories();

      setApiSports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sports error:", error);

      setError("Could not load sports categories.");
    } finally {
      setLoadingSports(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD LIVE + TODAY
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadMatches();

    /*
    |--------------------------------------------------------------------------
    | AUTO REFRESH
    |--------------------------------------------------------------------------
    */

    const timer = setInterval(loadMatches, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const loadMatches = async () => {
    try {
      setLoadingMatches(true);

      const [live, today] = await Promise.all([
        getLiveMatches(),
        getTodayMatches(),
      ]);

      setLiveMatches(Array.isArray(live) ? live : []);

      setTodayMatches(Array.isArray(today) ? today : []);
    } catch (error) {
      console.error("Matches error:", error);
    } finally {
      setLoadingMatches(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD LEAGUES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadLeagues(selectedSport);
  }, [selectedSport]);

  const loadLeagues = async (sportName) => {
    try {
      setLoadingLeagues(true);

      setLeagueError("");

      setLeagues([]);

      const sport = SPORTS.find((item) => item.name === sportName);

      const apiSport = sport?.apiName || sportName;

      const data = await getLeagues(apiSport);

      setLeagues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("League error:", error);

      setLeagueError("Could not load leagues for this sport.");
    } finally {
      setLoadingLeagues(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | MATCH FILTER
  |--------------------------------------------------------------------------
  */

  const filteredMatches = useMemo(() => {
    switch (activeFilter) {
      case "Live":
        return liveMatches;

      case "Upcoming":
        return todayMatches.filter((match) => match.status === "UPCOMING");

      case "Finished":
        return todayMatches.filter((match) => match.status === "FINISHED");

      default:
        return todayMatches;
    }
  }, [activeFilter, liveMatches, todayMatches]);

  /*
  |--------------------------------------------------------------------------
  | FORMAT TIME
  |--------------------------------------------------------------------------
  */

  const formatMatchTime = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#D4A017] uppercase tracking-[3px] text-sm font-semibold">
            Sports Explorer
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-black">Live Sports</h1>

          <p className="mt-5 max-w-3xl text-gray-400 text-lg leading-8">
            Follow live scores, today's matches, upcoming games, sports and
            leagues from around the world.
          </p>
        </div>
      </section>

      {/* ================================================================
          LIVE NOW
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />

                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>

                <p className="text-red-400 uppercase tracking-[2px] text-sm font-bold">
                  Live Now
                </p>
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                Live Matches
              </h2>
            </div>

            <button
              onClick={loadMatches}
              className="px-4 py-2 rounded-lg bg-[#24272D] border border-white/10 text-sm hover:border-[#D4A017]/50 transition"
            >
              Refresh
            </button>
          </div>

          {loadingMatches ? (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
              <div className="w-9 h-9 mx-auto border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

              <p className="mt-4 text-gray-400">Loading live matches...</p>
            </div>
          ) : liveMatches.length === 0 ? (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
              <div className="text-5xl">📺</div>

              <h3 className="mt-4 text-xl font-bold">
                No live matches right now
              </h3>

              <p className="mt-2 text-gray-500">
                Live events will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {liveMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  formatMatchTime={formatMatchTime}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          MATCH FILTER
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition ${
                  activeFilter === filter
                    ? "bg-[#D4A017] text-[#17191D]"
                    : "bg-[#24272D] text-gray-400 border border-white/10 hover:border-[#D4A017]/50"
                }`}
              >
                {filter}

                {filter === "Live" && liveMatches.length > 0 && (
                  <span className="ml-2">{liveMatches.length}</span>
                )}

                {filter === "All" && todayMatches.length > 0 && (
                  <span className="ml-2">{todayMatches.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TODAY'S MATCHES
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
              Scoreboard
            </p>

            <h2 className="mt-1 text-2xl sm:text-3xl font-black">
              {activeFilter === "All"
                ? "Today's Matches"
                : `${activeFilter} Matches`}
            </h2>

            <p className="mt-2 text-gray-500">
              Automatically updated every 30 seconds
            </p>
          </div>

          {loadingMatches ? (
            <div className="text-center text-gray-500 py-10">
              Loading matches...
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
              <div className="text-4xl">🏟️</div>

              <h3 className="mt-4 text-lg font-bold">No matches found</h3>

              <p className="mt-2 text-gray-500">
                There are no {activeFilter.toLowerCase()} matches available
                right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  formatMatchTime={formatMatchTime}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          SPORTS CATEGORIES
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                Categories
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-black">
                Sports Categories
              </h2>

              <p className="mt-2 text-gray-500">
                Choose a sport to explore its leagues
              </p>
            </div>

            {!loadingSports && (
              <p className="text-sm text-gray-500">
                {apiSports.length > 0
                  ? `${apiSports.length} sports available`
                  : `${SPORTS.length} sports`}
              </p>
            )}
          </div>

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPORTS.map((sport) => {
              const active = selectedSport === sport.name;

              return (
                <button
                  key={sport.name}
                  onClick={() => setSelectedSport(sport.name)}
                  className={`
                      group
                      rounded-2xl
                      p-5
                      border
                      transition
                      text-left
                      ${
                        active
                          ? "bg-[#D4A017] border-[#D4A017] text-[#17191D]"
                          : "bg-[#24272D] border-white/10 hover:border-[#D4A017]/50"
                      }
                    `}
                >
                  <div
                    className={`
                        text-3xl
                        ${active ? "" : "group-hover:scale-110"}
                        transition
                      `}
                  >
                    {sport.icon}
                  </div>

                  <p className="mt-4 font-bold">{sport.name}</p>

                  <p
                    className={`
                        mt-1 text-xs
                        ${active ? "text-[#17191D]/60" : "text-gray-500"}
                      `}
                  >
                    Explore leagues
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          LEAGUES
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                Tournament & League Explorer
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-black">
                {selectedSport} Leagues
              </h2>

              <p className="mt-2 text-gray-500">
                Explore tournaments and competitions
              </p>
            </div>

            {!loadingLeagues && leagues.length > 0 && (
              <p className="text-sm text-gray-500">{leagues.length} found</p>
            )}
          </div>

          {loadingLeagues && (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-9 h-9 mx-auto border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

              <p className="mt-5 text-gray-400">
                Loading {selectedSport} leagues...
              </p>
            </div>
          )}

          {!loadingLeagues && leagueError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
              <p className="text-red-300">{leagueError}</p>

              <button
                onClick={() => loadLeagues(selectedSport)}
                className="mt-5 px-5 py-2 rounded-lg bg-[#D4A017] text-[#17191D] font-bold"
              >
                Try Again
              </button>
            </div>
          )}

          {!loadingLeagues && !leagueError && leagues.length === 0 && (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-12 text-center">
              <div className="text-5xl">🏆</div>

              <h3 className="mt-5 text-xl font-bold">No leagues found</h3>

              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                No league data is currently available for {selectedSport}.
              </p>
            </div>
          )}

          {!loadingLeagues && !leagueError && leagues.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {leagues.map((league) => (
                <LeagueCard key={league.idLeague} league={league} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| MATCH CARD
|--------------------------------------------------------------------------
*/

function MatchCard({ match, formatMatchTime }) {
  const isLive = match.status === "LIVE";

  const isFinished = match.status === "FINISHED";

  return (
    <div
      className={`bg-[#24272D] border rounded-2xl p-5 transition hover:-translate-y-1 ${
        isLive
          ? "border-red-500/40"
          : "border-white/10 hover:border-[#D4A017]/40"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{match.icon || "🏆"}</span>

          <div>
            <p className="text-xs text-gray-500">{match.sportName}</p>

            <p className="text-sm font-semibold">{match.league}</p>
          </div>
        </div>

        {isLive ? (
          <span className="flex items-center gap-2 text-xs font-bold text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </span>
        ) : (
          <span
            className={`text-xs font-semibold ${
              isFinished ? "text-gray-500" : "text-[#D4A017]"
            }`}
          >
            {isFinished ? "FINISHED" : formatMatchTime(match.date)}
          </span>
        )}
      </div>

      {/* TEAMS */}

      <div className="mt-5 space-y-4">
        {/* AWAY */}

        <TeamRow team={match.awayTeam} score={match.awayTeam?.score} />

        {/* HOME */}

        <TeamRow team={match.homeTeam} score={match.homeTeam?.score} />
      </div>

      {/* STATUS */}

      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-500">{match.statusText}</span>

        {isLive && match.clock && (
          <span className="text-xs text-red-400 font-bold">{match.clock}</span>
        )}

        {!isLive && match.venue && (
          <span className="text-xs text-gray-600 truncate max-w-45">
            {match.venue}
          </span>
        )}
      </div>

      {/* ESPN LINK */}

      {match.link && (
        <a
          href={match.link}
          target="_blank"
          rel="noreferrer"
          className="block mt-4 text-center text-sm font-semibold text-[#D4A017] hover:underline"
        >
          View match details →
        </a>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| TEAM ROW
|--------------------------------------------------------------------------
*/

function TeamRow({ team, score }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[#17191D] flex items-center justify-center overflow-hidden shrink-0">
          {team?.logo ? (
            <img src={team.logo} alt="" className="w-7 h-7 object-contain" />
          ) : (
            <span className="text-sm">🏆</span>
          )}
        </div>

        <p className="font-semibold truncate">{team?.name || "Unknown Team"}</p>
      </div>

      <p className="text-xl font-black ml-3">{score ?? "-"}</p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| LEAGUE CARD
|--------------------------------------------------------------------------
*/

function LeagueCard({ league }) {
  return (
    <Link
      to={`/sports/league/${league.idLeague}`}
      className="group bg-[#24272D] border border-white/10 rounded-2xl p-6 hover:border-[#D4A017]/50 hover:-translate-y-1 transition"
    >
      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden">
        {league.strBadge ? (
          <img
            src={league.strBadge}
            alt={league.strLeague}
            className="w-12 h-12 object-contain"
          />
        ) : league.strLogo ? (
          <img
            src={league.strLogo}
            alt={league.strLeague}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span className="text-2xl">🏆</span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold group-hover:text-[#D4A017] transition">
        {league.strLeague}
      </h3>

      {league.strCountry && (
        <p className="mt-2 text-sm text-gray-500">🌍 {league.strCountry}</p>
      )}

      {league.strSport && (
        <p className="mt-1 text-sm text-gray-500">{league.strSport}</p>
      )}

      <p className="mt-5 text-sm text-[#D4A017]">Explore league →</p>
    </Link>
  );
}

export default Sports;
