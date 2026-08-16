import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getSportsCategories, getLeagues } from "../services/sportsService";

/*
|--------------------------------------------------------------------------
| SPORTS REQUIRED BY SPRINT 3
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
    name: "Volleyball",
    icon: "🏐",
    apiName: "Volleyball",
  },
];

function Sports() {
  const [apiSports, setApiSports] = useState([]);

  const [selectedSport, setSelectedSport] = useState("Football");

  const [leagues, setLeagues] = useState([]);

  const [loadingSports, setLoadingSports] = useState(true);

  const [loadingLeagues, setLoadingLeagues] = useState(false);

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

      console.log("API SPORTS:", data);

      setApiSports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sports error:", error);

      setError("Could not load sports from API.");
    } finally {
      setLoadingSports(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD LEAGUES WHEN SPORT CHANGES
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

      console.log("Loading leagues for:", apiSport);

      const data = await getLeagues(apiSport);

      console.log("LEAGUES:", data);

      setLeagues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("League error:", error);

      setLeagueError("Could not load leagues for this sport.");
    } finally {
      setLoadingLeagues(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D4A017] uppercase tracking-[3px] text-sm font-semibold">
            Sports Explorer
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-black">
            Explore Sports
          </h1>

          <p className="mt-5 max-w-2xl text-gray-400 text-lg leading-8">
            Discover sports, tournaments, leagues, teams and matches from around
            the world.
          </p>
        </div>
      </section>

      {/* ================================================================
          SPORTS CATEGORIES
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-6xl mx-auto">
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
                  ? `${apiSports.length} sports available from the API`
                  : "Sports explorer"}
              </p>
            )}
          </div>

          {/* API ERROR */}

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
              {error}
            </div>
          )}

          {/* SPORTS */}

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
        <div className="max-w-6xl mx-auto">
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

          {/* LOADING */}

          {loadingLeagues && (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-9 h-9 mx-auto border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

              <p className="mt-5 text-gray-400">
                Loading {selectedSport} leagues...
              </p>
            </div>
          )}

          {/* ERROR */}

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

          {/* EMPTY */}

          {!loadingLeagues && !leagueError && leagues.length === 0 && (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-12 text-center">
              <div className="text-5xl">🏆</div>

              <h3 className="mt-5 text-xl font-bold">No leagues found</h3>

              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                No league data is currently available for {selectedSport}.
              </p>
            </div>
          )}

          {/* LEAGUE GRID */}

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
| LEAGUE CARD
|--------------------------------------------------------------------------
*/

function LeagueCard({ league }) {
  return (
    <Link
      to={`/sports/league/${league.idLeague}`}
      className="group bg-[#24272D] border border-white/10 rounded-2xl p-6 hover:border-[#D4A017]/50 hover:-translate-y-1 transition"
    >
      {/* LOGO */}

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

      {/* NAME */}

      <h3 className="mt-5 text-lg font-bold group-hover:text-[#D4A017] transition">
        {league.strLeague}
      </h3>

      {/* COUNTRY */}

      {league.strCountry && (
        <p className="mt-2 text-sm text-gray-500">🌍 {league.strCountry}</p>
      )}

      {/* SPORT */}

      {league.strSport && (
        <p className="mt-1 text-sm text-gray-500">{league.strSport}</p>
      )}

      {/* LINK */}

      <p className="mt-5 text-sm text-[#D4A017]">Explore league →</p>
    </Link>
  );
}

export default Sports;
