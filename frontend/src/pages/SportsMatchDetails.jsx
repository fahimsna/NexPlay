import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getEventById } from "../services/sportsService";

function SportsMatchDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEventById(id);

      setEvent(data);
    } catch (error) {
      console.error("Match details error:", error);

      setError("Failed to load match details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-2 border-[#D4A017] border-t-transparent rounded-full mx-auto" />

          <p className="mt-5 text-gray-400">Loading match...</p>
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

  if (!event) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        Match not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <section className="px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <Link to="/sports" className="text-gray-400 hover:text-[#D4A017]">
            ← Back to Sports
          </Link>

          <div className="mt-8 bg-[#24272D] border border-white/10 rounded-3xl p-7 sm:p-12">
            {/* MATCH INFORMATION */}

            <div className="text-center">
              <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">
                {event.strSport}
              </p>

              <h1 className="mt-3 text-2xl sm:text-3xl font-black">
                {event.strLeague}
              </h1>

              <p className="mt-3 text-gray-500">
                {event.dateEvent} {event.strTime}
              </p>

              {event.strVenue && (
                <p className="mt-2 text-gray-500">{event.strVenue}</p>
              )}
            </div>

            {/* TEAMS */}

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-8 mt-12">
              {/* HOME */}

              <Team
                name={event.strHomeTeam}
                badge={event.strHomeTeamBadge}
                score={event.intHomeScore}
              />

              {/* VS */}

              <div className="text-center">
                <div className="inline-flex px-5 py-3 rounded-full bg-[#D4A017] text-[#17191D] font-black">
                  VS
                </div>

                <p className="mt-4 text-gray-500 text-sm">
                  {event.strStatus || "Scheduled"}
                </p>
              </div>

              {/* AWAY */}

              <Team
                name={event.strAwayTeam}
                badge={event.strAwayTeamBadge}
                score={event.intAwayScore}
              />
            </div>

            {/* DETAILS */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <Info label="Sport" value={event.strSport} />

              <Info label="League" value={event.strLeague} />

              <Info label="Round" value={event.intRound} />
            </div>

            {/* POSTPONED */}

            {event.strPostponed === "yes" && (
              <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-red-300">
                This match has been postponed.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Team({ name, badge, score }) {
  return (
    <div className="text-center">
      <div className="w-28 h-28 mx-auto bg-white rounded-2xl flex items-center justify-center">
        {badge ? (
          <img src={badge} alt={name} className="w-20 h-20 object-contain" />
        ) : (
          <span className="text-4xl">⚽</span>
        )}
      </div>

      <h2 className="mt-5 text-xl font-bold">{name}</h2>

      <p className="mt-3 text-4xl font-black text-[#D4A017]">{score ?? "-"}</p>
    </div>
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

export default SportsMatchDetails;
