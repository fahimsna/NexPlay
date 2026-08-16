import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getLeagueById,
  getLeagueUpcomingEvents,
  getLeaguePastEvents,
  getTeams,
} from "../services/sportsService";

function SportsLeagueDetails() {
  const { id } = useParams();

  const [league, setLeague] = useState(null);
  const [teams, setTeams] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeague();
  }, [id]);

  async function loadLeague() {
    try {
      setLoading(true);

      const leagueData = await getLeagueById(id);

      setLeague(leagueData);

      const [teamData, upcomingData, pastData] = await Promise.all([
        getTeams({
          league: leagueData.strLeague,
        }),

        getLeagueUpcomingEvents(id),

        getLeaguePastEvents(id),
      ]);

      setTeams(teamData);
      setUpcoming(upcomingData);
      setPast(pastData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        Loading league...
      </div>
    );
  }

  if (!league) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        League not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* HEADER */}

      <section className="px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/sports" className="text-gray-400 hover:text-[#D4A017]">
            ← Back to Sports
          </Link>

          <div className="mt-8 bg-[#24272D] border border-white/10 rounded-3xl p-7 sm:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                {league.strBadge ? (
                  <img
                    src={league.strBadge}
                    alt={league.strLeague}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <span className="text-[#D4A017] text-4xl">🏆</span>
                )}
              </div>

              <div>
                <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">
                  {league.strSport}
                </p>

                <h1 className="mt-2 text-3xl sm:text-4xl font-black">
                  {league.strLeague}
                </h1>

                <p className="mt-3 text-gray-400">
                  {league.strCountry || "International"}
                </p>
              </div>
            </div>

            {league.strDescriptionEN && (
              <p className="mt-8 text-gray-400 leading-7 max-w-4xl">
                {league.strDescriptionEN}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* UPCOMING MATCHES */}

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold">Upcoming Matches</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
            {upcoming.length === 0 ? (
              <p className="text-gray-500">No upcoming matches available.</p>
            ) : (
              upcoming.slice(0, 10).map((event) => (
                <Link
                  key={event.idEvent}
                  to={`/sports/match/${event.idEvent}`}
                  className="
                    bg-[#24272D]
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    hover:border-[#D4A017]
                    transition
                  "
                >
                  <p className="text-xs text-gray-500">
                    {event.dateEvent} {event.strTime}
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    <span className="font-semibold">{event.strHomeTeam}</span>

                    <span className="text-[#D4A017] font-bold">VS</span>

                    <span className="font-semibold text-right">
                      {event.strAwayTeam}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-5">
                    View match details →
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* TEAMS */}

      <section className="px-5 sm:px-8 lg:px-12 py-14">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold">League Teams</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-6">
            {teams.map((team) => (
              <Link
                key={team.idTeam}
                to={`/sports/team/${team.idTeam}`}
                className="
                  bg-[#24272D]
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  hover:border-[#D4A017]
                  transition
                "
              >
                <div className="h-24 flex items-center justify-center">
                  {team.strTeamBadge ? (
                    <img
                      src={team.strTeamBadge}
                      alt={team.strTeam}
                      className="h-20 w-20 object-contain"
                    />
                  ) : (
                    <div className="text-3xl">⚽</div>
                  )}
                </div>

                <h3 className="text-center font-semibold mt-4">
                  {team.strTeam}
                </h3>

                <p className="text-center text-xs text-gray-500 mt-1">
                  {team.strCountry}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIOUS MATCHES */}

      <section className="px-5 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold">Recent Matches</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
            {past.slice(0, 10).map((event) => (
              <Link
                key={event.idEvent}
                to={`/sports/match/${event.idEvent}`}
                className="
                  bg-[#24272D]
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  hover:border-[#D4A017]
                  transition
                "
              >
                <p className="text-xs text-gray-500">{event.dateEvent}</p>

                <div className="flex items-center justify-between mt-5">
                  <div>
                    <p className="font-semibold">{event.strHomeTeam}</p>

                    <p className="text-2xl font-black mt-2">
                      {event.intHomeScore ?? "-"}
                    </p>
                  </div>

                  <span className="text-gray-500">-</span>

                  <div className="text-right">
                    <p className="font-semibold">{event.strAwayTeam}</p>

                    <p className="text-2xl font-black mt-2">
                      {event.intAwayScore ?? "-"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SportsLeagueDetails;
