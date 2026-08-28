import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  getLeagueById,
  getLeagueUpcomingEvents,
  getLeaguePastEvents,
  getLeagueStandings,
} from "../services/sportsService";

function SportsLeagueDetails() {
  const { id } = useParams();

  const [league, setLeague] = useState(null);

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [pastEvents, setPastEvents] = useState([]);

  // Sprint 3: League Standings
  const [standings, setStandings] = useState([]);
  const [standingsLoading, setStandingsLoading] = useState(true);
  const [standingsError, setStandingsError] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD LEAGUE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadLeague();
  }, [id]);

  const loadLeague = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading league:", id);

      /*
      --------------------------------------------------------------
      Get league information
      --------------------------------------------------------------
      */

      const leagueData = await getLeagueById(id);

      console.log("League data:", leagueData);

      if (!leagueData) {
        setError("League information could not be found.");

        return;
      }

      setLeague(leagueData);

      /*
      --------------------------------------------------------------
      Load upcoming and past matches
      --------------------------------------------------------------
      */

      const [upcoming, past] = await Promise.allSettled([
        getLeagueUpcomingEvents(id),

        getLeaguePastEvents(id),
      ]);

      /*
      --------------------------------------------------------------
      Upcoming
      --------------------------------------------------------------
      */

      if (upcoming.status === "fulfilled") {
        console.log("Upcoming events:", upcoming.value);

        setUpcomingEvents(Array.isArray(upcoming.value) ? upcoming.value : []);
      } else {
        console.error("Upcoming events error:", upcoming.reason);

        setUpcomingEvents([]);
      }

      /*
      --------------------------------------------------------------
      Past
      --------------------------------------------------------------
      */

      if (past.status === "fulfilled") {
        console.log("Past events:", past.value);

        setPastEvents(Array.isArray(past.value) ? past.value : []);
      } else {
        console.error("Past events error:", past.reason);

        setPastEvents([]);
      }

      /*
      --------------------------------------------------------------
      Standings (Sprint 3)
      --------------------------------------------------------------
      */

      loadStandings(id, leagueData?.strCurrentSeason);
    } catch (error) {
      console.error("League details error:", error);

      setError("Failed to load league details.");
    } finally {
      setLoading(false);
    }
  };

  const loadStandings = async (leagueId, season) => {
    try {
      setStandingsLoading(true);
      setStandingsError("");

      const table = await getLeagueStandings(leagueId, season);

      setStandings(Array.isArray(table) ? table : []);
    } catch (error) {
      console.error("Standings error:", error);

      setStandingsError("Standings are not available for this league right now.");

      setStandings([]);
    } finally {
      setStandingsLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#D4A017] border-t-transparent animate-spin" />

          <p className="mt-5 text-gray-400">Loading league...</p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-red-400">{error}</p>

          <Link
            to="/sports"
            className="inline-block mt-6 text-[#D4A017] hover:underline"
          >
            ← Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NO LEAGUE
  |--------------------------------------------------------------------------
  */

  if (!league) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        League not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* ================================================================
          HEADER
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/sports"
            className="text-gray-400 hover:text-[#D4A017] transition"
          >
            ← Back to Sports
          </Link>

          {/* LEAGUE HERO */}

          <div className="mt-8 bg-[#24272D] border border-white/10 rounded-3xl p-7 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-7">
              {/* LOGO */}

              <div className="w-28 h-28 shrink-0 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                {league.strBadge ? (
                  <img
                    src={league.strBadge}
                    alt={league.strLeague}
                    className="w-20 h-20 object-contain"
                  />
                ) : league.strLogo ? (
                  <img
                    src={league.strLogo}
                    alt={league.strLeague}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <span className="text-4xl">🏆</span>
                )}
              </div>

              {/* INFORMATION */}

              <div className="flex-1">
                <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                  {league.strSport || "Sport"}
                </p>

                <h1 className="mt-2 text-3xl sm:text-4xl font-black">
                  {league.strLeague}
                </h1>

                <div className="flex flex-wrap gap-3 mt-4">
                  {league.strCountry && (
                    <span className="px-4 py-2 bg-[#1B1E22] rounded-full text-sm text-gray-300">
                      🌍 {league.strCountry}
                    </span>
                  )}

                  {league.strCurrentSeason && (
                    <span className="px-4 py-2 bg-[#1B1E22] rounded-full text-sm text-gray-300">
                      Season: {league.strCurrentSeason}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          STANDINGS (Sprint 3)
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                Table
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-black">
                League Standings
              </h2>
            </div>
          </div>

          {standingsLoading ? (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
              <div className="w-9 h-9 mx-auto border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

              <p className="mt-4 text-gray-400">Loading standings...</p>
            </div>
          ) : standingsError || standings.length === 0 ? (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
              <div className="text-4xl">📊</div>

              <h3 className="mt-4 text-lg font-bold">Standings unavailable</h3>

              <p className="mt-2 text-gray-500 text-sm">
                {standingsError ||
                  "No standings table is currently available for this league/season."}
              </p>
            </div>
          ) : (
            <div className="bg-[#24272D] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left min-w-140">
                <thead className="bg-[#1B1E22] text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3 text-center">P</th>
                    <th className="px-4 py-3 text-center">W</th>
                    <th className="px-4 py-3 text-center">D</th>
                    <th className="px-4 py-3 text-center">L</th>
                    <th className="px-4 py-3 text-center">GD</th>
                    <th className="px-4 py-3 text-center">Pts</th>
                  </tr>
                </thead>

                <tbody>
                  {standings.map((row) => (
                    <tr
                      key={row.idTeam || row.intRank}
                      className="border-t border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-3 font-semibold text-gray-400">
                        {row.intRank}
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          to={row.idTeam ? `/sports/team/${row.idTeam}` : "#"}
                          className="flex items-center gap-3 hover:text-[#D4A017] transition"
                        >
                          {row.strBadge && (
                            <img
                              src={row.strBadge}
                              alt=""
                              className="w-6 h-6 object-contain"
                            />
                          )}

                          <span className="font-semibold">
                            {row.strTeam}
                          </span>
                        </Link>
                      </td>

                      <td className="px-4 py-3 text-center">{row.intPlayed}</td>
                      <td className="px-4 py-3 text-center">{row.intWin}</td>
                      <td className="px-4 py-3 text-center">{row.intDraw}</td>
                      <td className="px-4 py-3 text-center">{row.intLoss}</td>
                      <td className="px-4 py-3 text-center">{row.intGoalDifference}</td>
                      <td className="px-4 py-3 text-center font-bold text-[#D4A017]">
                        {row.intPoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          MATCHES
      ================================================================= */}

      <section className="px-5 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* ============================================================
              UPCOMING
          ============================================================= */}

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
                  Fixtures
                </p>

                <h2 className="mt-1 text-2xl sm:text-3xl font-black">
                  Upcoming Matches
                </h2>
              </div>

              <span className="text-sm text-gray-500">
                {upcomingEvents.length} match
                {upcomingEvents.length !== 1 ? "es" : ""}
              </span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {upcomingEvents.map((event) => (
                  <MatchCard
                    key={event.idEvent}
                    event={event}
                    upcoming={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming matches"
                text="There are currently no upcoming fixtures available for this league."
              />
            )}
          </div>

          {/* ============================================================
              PAST
          ============================================================= */}

          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-[2px]">
                  Results
                </p>

                <h2 className="mt-1 text-2xl sm:text-3xl font-black">
                  Previous Matches
                </h2>
              </div>

              <span className="text-sm text-gray-500">
                {pastEvents.length} match
                {pastEvents.length !== 1 ? "es" : ""}
              </span>
            </div>

            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {pastEvents.map((event) => (
                  <MatchCard
                    key={event.idEvent}
                    event={event}
                    upcoming={false}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No previous matches"
                text="There are currently no previous match results available for this league."
              />
            )}
          </div>
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

function MatchCard({ event, upcoming }) {
  const homeScore =
    (event.intHomeScore ?? event.intHomeScore === 0) ? event.intHomeScore : "-";

  const awayScore =
    (event.intAwayScore ?? event.intAwayScore === 0) ? event.intAwayScore : "-";

  const date = formatDate(event.dateEvent);

  const time = event.strTime ? formatTime(event.strTime) : "";

  return (
    <Link
      to={`/sports/match/${event.idEvent}`}
      className="group bg-[#24272D] border border-white/10 rounded-2xl p-6 hover:border-[#D4A017]/50 hover:bg-[#292C32] transition"
    >
      {/* DATE */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#D4A017] text-sm font-semibold">{date}</p>

          {time && <p className="text-gray-500 text-xs mt-1">{time}</p>}
        </div>

        <span className="text-xs text-gray-500 group-hover:text-[#D4A017] transition">
          View match →
        </span>
      </div>

      {/* TEAMS */}

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center mt-6">
        {/* HOME */}

        <TeamMini
          name={event.strHomeTeam}
          badge={event.strHomeTeamBadge}
          align="right"
        />

        {/* SCORE */}

        <div className="text-center min-w-20">
          {upcoming ? (
            <div className="text-xs uppercase tracking-wider text-gray-500">
              vs
            </div>
          ) : (
            <div className="text-2xl font-black text-[#D4A017]">
              {homeScore}

              <span className="text-gray-600 mx-2">-</span>

              {awayScore}
            </div>
          )}

          <p className="mt-2 text-[11px] text-gray-600 uppercase">
            {event.strStatus || (upcoming ? "Scheduled" : "Finished")}
          </p>
        </div>

        {/* AWAY */}

        <TeamMini
          name={event.strAwayTeam}
          badge={event.strAwayTeamBadge}
          align="left"
        />
      </div>

      {/* VENUE */}

      {event.strVenue && (
        <div className="mt-5 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500">📍 {event.strVenue}</p>
        </div>
      )}
    </Link>
  );
}

/*
|--------------------------------------------------------------------------
| MINI TEAM
|--------------------------------------------------------------------------
*/

function TeamMini({ name, badge, align }) {
  return (
    <div
      className={`flex items-center gap-3 min-w-0 ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      {align === "right" && (
        <p className="min-w-0 truncate font-semibold text-sm sm:text-base text-right">
          {name || "Home Team"}
        </p>
      )}

      <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center">
        {badge ? (
          <img src={badge} alt={name} className="w-9 h-9 object-contain" />
        ) : (
          <span className="text-xl">⚽</span>
        )}
      </div>

      {align === "left" && (
        <p className="min-w-0 truncate font-semibold text-sm sm:text-base">
          {name || "Away Team"}
        </p>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| EMPTY STATE
|--------------------------------------------------------------------------
*/

function EmptyState({ title, text }) {
  return (
    <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
      <div className="text-4xl mb-4">🏟️</div>

      <h3 className="text-lg font-bold">{title}</h3>

      <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">{text}</p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FORMAT DATE
|--------------------------------------------------------------------------
*/

function formatDate(dateString) {
  if (!dateString) {
    return "Date unavailable";
  }

  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/*
|--------------------------------------------------------------------------
| FORMAT TIME
|--------------------------------------------------------------------------
*/

function formatTime(timeString) {
  if (!timeString) {
    return "";
  }

  try {
    const [hours, minutes] = timeString.split(":");

    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return timeString;
  }
}

export default SportsLeagueDetails;
