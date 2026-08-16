import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaFutbol,
  FaBasketballBall,
  FaBaseballBall,
  FaVolleyballBall,
  FaTableTennis,
  FaTrophy,
} from "react-icons/fa";

import { getSportsCategories, getLeagues } from "../services/sportsService";

/*
|--------------------------------------------------------------------------
| Sports
|--------------------------------------------------------------------------
|
| label   = name shown to user
| apiName = name expected by TheSportsDB
|
|--------------------------------------------------------------------------
*/

const popularSports = [
  {
    label: "Football",
    apiName: "Soccer",
    icon: FaFutbol,
  },

  {
    label: "Cricket",
    apiName: "Cricket",
    icon: FaTrophy,
  },

  {
    label: "Basketball",
    apiName: "Basketball",
    icon: FaBasketballBall,
  },

  {
    label: "Tennis",
    apiName: "Tennis",
    icon: FaTableTennis,
  },

  {
    label: "Baseball",
    apiName: "Baseball",
    icon: FaBaseballBall,
  },

  {
    label: "Volleyball",
    apiName: "Volleyball",
    icon: FaVolleyballBall,
  },
];

function Sports() {
  const [sports, setSports] = useState([]);

  const [leagues, setLeagues] = useState([]);

  const [selectedSport, setSelectedSport] = useState(popularSports[0]);

  const [loadingSports, setLoadingSports] = useState(true);

  const [loadingLeagues, setLoadingLeagues] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load sports
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadSports();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Load leagues
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadLeagues(selectedSport.apiName);
  }, [selectedSport]);

  /*
  |--------------------------------------------------------------------------
  | Get sports
  |--------------------------------------------------------------------------
  */

  const loadSports = async () => {
    try {
      setLoadingSports(true);

      const data = await getSportsCategories();

      setSports(data);
    } catch (error) {
      console.error("Sports error:", error);
    } finally {
      setLoadingSports(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Get leagues
  |--------------------------------------------------------------------------
  */

  const loadLeagues = async (sport) => {
    try {
      setLoadingLeagues(true);

      setError("");

      setLeagues([]);

      console.log("Loading leagues for:", sport);

      const data = await getLeagues({
        sport,
      });

      console.log("Leagues received:", data);

      setLeagues(data);
    } catch (error) {
      console.error("League error:", error);

      setError("Unable to load leagues.");

      setLeagues([]);
    } finally {
      setLoadingLeagues(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const filteredLeagues = leagues.filter((league) =>
    league.strLeague?.toLowerCase().includes(search.toLowerCase()),
  );

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#D4A017] text-xs uppercase tracking-[2px]">
              Sports Explorer
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Explore
              <span className="text-[#D4A017]"> Sports</span>
            </h1>

            <p className="mt-5 text-gray-400 text-lg">
              Discover sports, tournaments, leagues, teams and matches from
              around the world.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SPORTS CATEGORIES
      ========================================================= */}

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Sports Categories</h2>

            <p className="text-gray-500 mt-1">
              Choose a sport to explore its leagues
            </p>
          </div>

          {loadingSports ? (
            <p className="text-gray-500">Loading sports...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularSports.map((sport) => {
                const Icon = sport.icon;

                const active = selectedSport.apiName === sport.apiName;

                return (
                  <button
                    key={sport.apiName}
                    onClick={() => setSelectedSport(sport)}
                    className={`
                        p-5
                        rounded-2xl
                        border
                        transition
                        text-left
                        ${
                          active
                            ? "bg-[#D4A017] text-[#17191D] border-[#D4A017]"
                            : "bg-[#24272D] border-white/10 hover:border-[#D4A017]"
                        }
                      `}
                  >
                    <Icon size={28} />

                    <p className="mt-4 font-semibold">{sport.label}</p>
                  </button>
                );
              })}
            </div>
          )}

          {!loadingSports && (
            <p className="mt-5 text-sm text-gray-500">
              {sports.length > 0
                ? `${sports.length} sports available from the API`
                : "Sports API unavailable"}
            </p>
          )}
        </div>
      </section>

      {/* =========================================================
          LEAGUE EXPLORER
      ========================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                Tournament & League Explorer
              </span>

              <h2 className="mt-2 text-3xl font-black">
                {selectedSport.label} Leagues
              </h2>

              <p className="mt-2 text-gray-500">
                Explore tournaments and competitions
              </p>
            </div>

            {/* SEARCH */}

            <div className="w-full lg:w-80">
              <input
                type="text"
                placeholder="Search leagues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  px-5
                  py-3
                  rounded-xl
                  bg-[#24272D]
                  border
                  border-white/10
                  outline-none
                  focus:border-[#D4A017]
                "
              />
            </div>
          </div>

          {/* LOADING */}

          {loadingLeagues && (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-[#D4A017] border-t-transparent rounded-full mx-auto" />

              <p className="mt-5 text-gray-400">
                Loading {selectedSport.label} leagues...
              </p>
            </div>
          )}

          {/* ERROR */}

          {!loadingLeagues && error && (
            <div className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300">
              <p>{error}</p>

              <button
                onClick={() => loadLeagues(selectedSport.apiName)}
                className="mt-3 underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* EMPTY */}

          {!loadingLeagues && !error && filteredLeagues.length === 0 && (
            <div className="text-center py-20">
              <FaTrophy className="mx-auto text-gray-600" size={40} />

              <p className="mt-4 text-gray-400">
                No leagues found for {selectedSport.label}.
              </p>

              <p className="mt-2 text-sm text-gray-600">Try another sport.</p>
            </div>
          )}

          {/* LEAGUES */}

          {!loadingLeagues && filteredLeagues.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {filteredLeagues.map((league) => (
                <Link
                  key={league.idLeague}
                  to={`/sports/league/${league.idLeague}`}
                  className="
                        group
                        bg-[#24272D]
                        border
                        border-white/10
                        rounded-2xl
                        p-6
                        hover:border-[#D4A017]
                        hover:-translate-y-1
                        transition
                      "
                >
                  {/* BADGE */}

                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    {league.strBadge ? (
                      <img
                        src={league.strBadge}
                        alt={league.strLeague}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <FaTrophy className="text-[#D4A017]" />
                    )}
                  </div>

                  {/* NAME */}

                  <h3 className="mt-5 font-bold text-lg group-hover:text-[#D4A017] transition">
                    {league.strLeague}
                  </h3>

                  {/* COUNTRY */}

                  <p className="mt-2 text-sm text-gray-500">
                    {league.strCountry || "International"}
                  </p>

                  {/* SPORT */}

                  <p className="mt-1 text-xs text-gray-600">
                    {league.strSport}
                  </p>

                  {/* LINK */}

                  <div className="mt-5 text-sm text-[#D4A017]">
                    Explore league →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Sports;
