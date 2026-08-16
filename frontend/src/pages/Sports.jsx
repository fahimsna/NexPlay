import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFutbol,
  FaBasketballBall,
  FaBaseballBall,
  FaVolleyballBall,
  FaTableTennis,
  FaFlagCheckered,
  FaTrophy,
} from "react-icons/fa";

import { getSportsCategories, getLeagues } from "../services/sportsService";

const sportIcons = {
  Soccer: FaFutbol,
  Football: FaFutbol,
  Basketball: FaBasketballBall,
  Baseball: FaBaseballBall,
  Volleyball: FaVolleyballBall,
  Tennis: FaTableTennis,
  Motorsport: FaFlagCheckered,
};

const popularSports = [
  "Soccer",
  "Cricket",
  "Basketball",
  "Tennis",
  "Baseball",
  "Volleyball",
];

function Sports() {
  const [sports, setSports] = useState([]);
  const [leagues, setLeagues] = useState([]);

  const [selectedSport, setSelectedSport] = useState("Soccer");

  const [loadingSports, setLoadingSports] = useState(true);

  const [loadingLeagues, setLoadingLeagues] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSports();
  }, []);

  useEffect(() => {
    loadLeagues(selectedSport);
  }, [selectedSport]);

  async function loadSports() {
    try {
      setLoadingSports(true);

      const data = await getSportsCategories();

      setSports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSports(false);
    }
  }

  async function loadLeagues(sport) {
    try {
      setLoadingLeagues(true);

      const data = await getLeagues({
        sport,
      });

      setLeagues(data);
    } catch (error) {
      console.error(error);
      setLeagues([]);
    } finally {
      setLoadingLeagues(false);
    }
  }

  const filteredLeagues = leagues.filter((league) =>
    league.strLeague?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* HERO */}

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

      {/* POPULAR SPORTS */}

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Sports Categories</h2>

              <p className="text-gray-500 mt-1">
                Choose a sport to explore its leagues
              </p>
            </div>
          </div>

          {loadingSports ? (
            <div className="text-gray-400">Loading sports...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularSports.map((sport) => {
                const Icon = sportIcons[sport] || FaTrophy;

                const active = selectedSport === sport;

                return (
                  <button
                    key={sport}
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

                    <p className="mt-4 font-semibold">{sport}</p>
                  </button>
                );
              })}
            </div>
          )}

          {/* ALL API SPORTS */}

          {sports.length > 0 && (
            <div className="mt-8">
              <p className="text-sm text-gray-500">
                API supports {sports.length} sports
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LEAGUES */}

      <section className="px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                Tournament & League Explorer
              </span>

              <h2 className="mt-2 text-3xl font-black">
                {selectedSport} Leagues
              </h2>
            </div>

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

          {loadingLeagues ? (
            <div className="text-center py-20 text-gray-400">
              Loading leagues...
            </div>
          ) : filteredLeagues.length === 0 ? (
            <div className="text-center py-20">
              <FaTrophy className="mx-auto text-gray-600" size={40} />

              <p className="mt-4 text-gray-400">
                No leagues found for this sport.
              </p>
            </div>
          ) : (
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

                  <h3 className="mt-5 font-bold text-lg group-hover:text-[#D4A017] transition">
                    {league.strLeague}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {league.strCountry || "International"}
                  </p>

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
