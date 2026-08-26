import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  getTeamById,
  getNextTeamEvents,
  getPastTeamEvents,
} from "../services/sportsService";

function SportsTeamDetails() {
  const { id } = useParams();

  const [team, setTeam] = useState(null);

  const [upcoming, setUpcoming] = useState([]);

  const [past, setPast] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError("");

      const teamData = await getTeamById(id);

      console.log("TEAM DETAILS:", teamData);

      if (!teamData) {
        setError("Team not found.");

        return;
      }

      setTeam(teamData);

      const [nextResult, pastResult] = await Promise.allSettled([
        getNextTeamEvents(id),

        getPastTeamEvents(id),
      ]);

      if (nextResult.status === "fulfilled") {
        setUpcoming(Array.isArray(nextResult.value) ? nextResult.value : []);
      }

      if (pastResult.status === "fulfilled") {
        setPast(Array.isArray(pastResult.value) ? pastResult.value : []);
      }
    } catch (error) {
      console.error("Team details error:", error);

      setError("Failed to load team details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

          <p className="mt-5 text-gray-400">Loading team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">{error}</p>

          <Link to="/sports" className="inline-block mt-5 text-[#D4A017]">
            ← Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        Team not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <section className="px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <Link to="/sports" className="text-gray-400 hover:text-[#D4A017]">
            ← Back to Sports
          </Link>

          {/* TEAM HERO */}

          <div className="mt-8 bg-[#24272D] border border-white/10 rounded-3xl p-8 sm:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-36 bg-white rounded-3xl flex items-center justify-center">
                {team.strBadge ? (
                  <img
                    src={team.strBadge}
                    alt={team.strTeam}
                    className="w-28 h-28 object-contain"
                  />
                ) : team.strLogo ? (
                  <img
                    src={team.strLogo}
                    alt={team.strTeam}
                    className="w-28 h-28 object-contain"
                  />
                ) : (
                  <span className="text-5xl">⚽</span>
                )}
              </div>

              <p className="mt-7 text-[#D4A017] uppercase tracking-[2px] text-sm">
                {team.strSport || "Sport"}
              </p>

              <h1 className="mt-2 text-3xl sm:text-4xl font-black">
                {team.strTeam}
              </h1>

              {team.strLeague && (
                <p className="mt-3 text-gray-400">{team.strLeague}</p>
              )}

              {team.strCountry && (
                <p className="mt-2 text-gray-500">🌍 {team.strCountry}</p>
              )}
            </div>

            {/* TEAM INFORMATION */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              <Info label="Sport" value={team.strSport} />

              <Info label="League" value={team.strLeague} />

              <Info label="Country" value={team.strCountry} />

              <Info label="Stadium" value={team.strStadium} />
            </div>
          </div>

          {/* UPCOMING */}

          <section className="mt-14">
            <p className="text-[#D4A017] text-sm uppercase tracking-[2px]">
              Fixtures
            </p>

            <h2 className="mt-1 text-2xl font-black">Upcoming Matches</h2>

            <div className="mt-6">
              {upcoming.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {upcoming.map((event) => (
                    <EventCard key={event.idEvent} event={event} />
                  ))}
                </div>
              ) : (
                <Empty text="No upcoming matches available." />
              )}
            </div>
          </section>

          {/* PAST */}

          <section className="mt-14 pb-16">
            <p className="text-gray-500 text-sm uppercase tracking-[2px]">
              Results
            </p>

            <h2 className="mt-1 text-2xl font-black">Previous Matches</h2>

            <div className="mt-6">
              {past.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {past.map((event) => (
                    <EventCard key={event.idEvent} event={event} />
                  ))}
                </div>
              ) : (
                <Empty text="No previous matches available." />
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <Link
      to={`/sports/match/${event.idEvent}`}
      className="block bg-[#24272D] border border-white/10 rounded-2xl p-6 hover:border-[#D4A017]/50 transition"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#D4A017] text-sm">
            {event.dateEvent || "Date unavailable"}
          </p>

          {event.strTime && (
            <p className="mt-1 text-xs text-gray-500">{event.strTime}</p>
          )}
        </div>

        <span className="text-xs text-gray-500">View match →</span>
      </div>

      <div className="grid grid-cols-3 items-center gap-4 mt-6">
        <p className="font-semibold text-right">{event.strHomeTeam}</p>

        <div className="text-center">
          <p className="text-xl font-black text-[#D4A017]">
            {event.intHomeScore ?? "-"}

            <span className="text-gray-600 mx-2">-</span>

            {event.intAwayScore ?? "-"}
          </p>
        </div>

        <p className="font-semibold">{event.strAwayTeam}</p>
      </div>
    </Link>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-[#1B1E22] rounded-xl p-5 text-center">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>

      <p className="mt-2 font-semibold">{value || "N/A"}</p>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="bg-[#24272D] border border-white/10 rounded-2xl p-8 text-center">
      <p className="text-gray-500">{text}</p>
    </div>
  );
}

export default SportsTeamDetails;
