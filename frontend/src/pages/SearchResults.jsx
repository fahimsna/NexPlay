import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

import EntertainmentCard from "../components/entertainment/EntertainmentCard";
import { searchMovies, searchTVShows } from "../services/tmdbService";
import { searchTeam, searchLeague } from "../services/sportsService";

/*
|--------------------------------------------------------------------------
| SEARCH RESULTS
|--------------------------------------------------------------------------
|
| One global search box (used from the Navbar) that looks across
| everything on NexPlay at once - movies, series, AND sports (teams +
| leagues) - instead of only ever landing on the movies-only Browse
| search. Query lives in the URL (?q=...) so results are shareable and
| the back/forward buttons work like normal.
|
|--------------------------------------------------------------------------
*/

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    setQuery(initialQuery);

    if (initialQuery.trim()) {
      runSearch(initialQuery.trim());
    } else {
      setMovies([]);
      setSeries([]);
      setTeams([]);
      setLeagues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  async function runSearch(term) {
    try {
      setLoading(true);
      setError("");

      // Promise.allSettled - if one source (say sports) fails, the other
      // results should still show instead of the whole search failing.
      const [movieResult, seriesResult, teamResult, leagueResult] =
        await Promise.allSettled([
          searchMovies(term),
          searchTVShows(term),
          searchTeam(term),
          searchLeague(term),
        ]);

      setMovies(movieResult.status === "fulfilled" ? movieResult.value : []);
      setSeries(seriesResult.status === "fulfilled" ? seriesResult.value : []);
      setTeams(teamResult.status === "fulfilled" ? teamResult.value : []);
      setLeagues(leagueResult.status === "fulfilled" ? leagueResult.value : []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = query.trim();

    setSearchParams(trimmed ? { q: trimmed } : {});
  }

  const hasQuery = initialQuery.trim().length > 0;
  const totalResults = movies.length + series.length + teams.length + leagues.length;

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <section className="px-5 sm:px-8 lg:px-12 py-10">
        {/* HEADER + SEARCH BOX */}

        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#D4A017] text-xs uppercase tracking-[2px]">
            Search
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl font-black">
            {hasQuery ? `Results for "${initialQuery}"` : "Search NexPlay"}
          </h1>

          <p className="mt-3 text-gray-400">
            Search movies, series, and sports teams/leagues - all in one place.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, series, teams, leagues..."
              className="flex-1 px-5 py-4 rounded-2xl bg-[#24272D] border border-white/10 outline-none focus:border-[#D4A017] text-white"
            />

            <button
              type="submit"
              className="shrink-0 px-6 py-4 rounded-2xl bg-[#D4A017] text-[#17191D] font-semibold hover:scale-105 transition flex items-center gap-2"
            >
              <HiOutlineSearch size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>

        {/* RESULTS */}

        {!hasQuery ? (
          <p className="text-center text-gray-500 mt-16">
            Type something above to search movies, series, teams, and leagues.
          </p>
        ) : loading ? (
          <div className="text-center mt-20 text-2xl">Searching...</div>
        ) : error ? (
          <div className="max-w-xl mx-auto mt-10 bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-red-300 text-center">
            {error}
          </div>
        ) : totalResults === 0 ? (
          <div className="max-w-xl mx-auto mt-16 bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">🔍</div>

            <h3 className="text-lg font-bold">No results found</h3>

            <p className="mt-2 text-gray-500 text-sm">
              Try a different spelling, or search for a movie, series, team, or
              league name.
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto mt-14 space-y-14">
            {movies.length > 0 && (
              <ResultSection title="Movies" count={movies.length}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {movies.map((item) => (
                    <EntertainmentCard key={`movie-${item.id}`} movie={item} />
                  ))}
                </div>
              </ResultSection>
            )}

            {series.length > 0 && (
              <ResultSection title="Series" count={series.length}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {series.map((item) => (
                    <EntertainmentCard key={`tv-${item.id}`} movie={item} />
                  ))}
                </div>
              </ResultSection>
            )}

            {(teams.length > 0 || leagues.length > 0) && (
              <ResultSection title="Sports" count={teams.length + leagues.length}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {teams.map((team) => (
                    <SportsResultCard
                      key={`team-${team.idTeam}`}
                      to={`/sports/team/${team.idTeam}`}
                      badge={team.strTeamBadge || team.strTeamLogo || team.strBadge}
                      name={team.strTeam}
                      subtitle={team.strSport ? `${team.strSport} · Team` : "Team"}
                    />
                  ))}

                  {leagues.map((league) => (
                    <SportsResultCard
                      key={`league-${league.idLeague}`}
                      to={`/sports/league/${league.idLeague}`}
                      badge={league.strBadge || league.strLogo}
                      name={league.strLeague}
                      subtitle={league.strSport ? `${league.strSport} · League` : "League"}
                    />
                  ))}
                </div>
              </ResultSection>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| RESULT SECTION
|--------------------------------------------------------------------------
*/

function ResultSection({ title, count, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black">{title}</h2>

        <span className="text-sm text-gray-500">({count})</span>
      </div>

      {children}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SPORTS RESULT CARD
|--------------------------------------------------------------------------
*/

function SportsResultCard({ to, badge, name, subtitle }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 bg-[#24272D] border border-white/10 rounded-2xl p-5 hover:border-[#D4A017]/50 hover:bg-[#292C32] transition"
    >
      <div className="w-14 h-14 shrink-0 rounded-xl bg-white flex items-center justify-center overflow-hidden">
        {badge ? (
          <img src={badge} alt={name || "Result"} className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-2xl">🏆</span>
        )}
      </div>

      <div className="min-w-0">
        <p className="font-semibold truncate">{name || "Unknown"}</p>

        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </Link>
  );
}

export default SearchResults;
