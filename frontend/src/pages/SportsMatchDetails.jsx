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

      console.log("MATCH DETAILS:", data);

      setEvent(data);
    } catch (error) {
      console.error("Match details error:", error);

      setError("Failed to load match details.");
    } finally {
      setLoading(false);
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
          <div className="animate-spin w-10 h-10 border-2 border-[#D4A017] border-t-transparent rounded-full mx-auto" />

          <p className="mt-5 text-gray-400">Loading match...</p>
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
            className="inline-block mt-5 text-[#D4A017] hover:underline"
          >
            ← Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!event) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Match not found.</p>

          <Link to="/sports" className="inline-block mt-5 text-[#D4A017]">
            ← Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MATCH STATUS
  |--------------------------------------------------------------------------
  */

  const status = event.strStatus || event.strProgress || "Scheduled";

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <section className="px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          {/* BACK */}

          <Link
            to="/sports"
            className="text-gray-400 hover:text-[#D4A017] transition"
          >
            ← Back to Sports
          </Link>

          {/* MATCH CONTAINER */}

          <div className="mt-8 bg-[#24272D] border border-white/10 rounded-3xl p-7 sm:p-12">
            {/* ==========================================================
                MATCH INFORMATION
            ========================================================== */}

            <div className="text-center">
              <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">
                {event.strSport || "Sport"}
              </p>

              <h1 className="mt-3 text-2xl sm:text-3xl font-black">
                {event.strLeague || "League"}
              </h1>

              {/* DATE */}

              <p className="mt-4 text-gray-400">
                {formatDate(event.dateEvent)}

                {event.strTime && (
                  <span className="ml-2">{formatTime(event.strTime)}</span>
                )}
              </p>

              {/* VENUE */}

              {event.strVenue && (
                <p className="mt-2 text-gray-500">📍 {event.strVenue}</p>
              )}
            </div>

            {/* ==========================================================
                TEAMS
            ========================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-8 mt-12">
              {/* HOME TEAM */}

              <Team
                name={event.strHomeTeam}
                badge={event.strHomeTeamBadge}
                score={event.intHomeScore}
                teamId={event.idHomeTeam}
              />

              {/* VS */}

              <div className="text-center">
                <div className="inline-flex px-5 py-3 rounded-full bg-[#D4A017] text-[#17191D] font-black">
                  VS
                </div>

                <p className="mt-4 text-gray-400 text-sm">{status}</p>
              </div>

              {/* AWAY TEAM */}

              <Team
                name={event.strAwayTeam}
                badge={event.strAwayTeamBadge}
                score={event.intAwayScore}
                teamId={event.idAwayTeam}
              />
            </div>

            {/* ==========================================================
                MATCH DETAILS
            ========================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              <Info label="Sport" value={event.strSport} />

              <Info label="League" value={event.strLeague} />

              <Info label="Round" value={event.intRound} />

              <Info label="Season" value={event.strSeason} />
            </div>

            {/* ==========================================================
                VENUE DETAILS
            ========================================================== */}

            {(event.strVenue || event.strCity || event.strCountry) && (
              <div className="mt-8 bg-[#1B1E22] rounded-2xl p-6">
                <h2 className="text-lg font-bold">Venue</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  {event.strVenue && (
                    <Info label="Stadium" value={event.strVenue} />
                  )}

                  {event.strCity && <Info label="City" value={event.strCity} />}

                  {event.strCountry && (
                    <Info label="Country" value={event.strCountry} />
                  )}
                </div>
              </div>
            )}

            {/* ==========================================================
                MATCH DESCRIPTION
            ========================================================== */}

            {event.strDescription && (
              <div className="mt-8">
                <h2 className="text-xl font-bold">Match Information</h2>

                <p className="mt-3 text-gray-400 leading-7">
                  {event.strDescription}
                </p>
              </div>
            )}

            {/* ==========================================================
                POSTPONED
            ========================================================== */}

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

/*
|--------------------------------------------------------------------------
| TEAM
|--------------------------------------------------------------------------
*/

function Team({ name, badge, score, teamId }) {
  const content = (
    <div className="text-center">
      {/* BADGE */}

      <div className="w-28 h-28 mx-auto bg-white rounded-2xl flex items-center justify-center overflow-hidden">
        {badge ? (
          <img
            src={badge}
            alt={name || "Team"}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <span className="text-4xl">⚽</span>
        )}
      </div>

      {/* TEAM NAME */}

      <h2 className="mt-5 text-xl font-bold">{name || "Unknown Team"}</h2>

      {/* SCORE */}

      <p className="mt-3 text-4xl font-black text-[#D4A017]">
        {score !== null && score !== undefined && score !== "" ? score : "-"}
      </p>

      {/* TEAM DETAILS */}

      {teamId && (
        <p className="mt-3 text-sm text-gray-500 group-hover:text-[#D4A017]">
          View team →
        </p>
      )}
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | If API provides team ID, make it clickable
  |--------------------------------------------------------------------------
  */

  if (teamId) {
    return (
      <Link
        to={`/sports/team/${teamId}`}
        className="group block hover:-translate-y-1 transition"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/*
|--------------------------------------------------------------------------
| INFO
|--------------------------------------------------------------------------
*/

function Info({ label, value }) {
  return (
    <div className="bg-[#1B1E22] rounded-xl p-5 text-center">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>

      <p className="mt-2 font-semibold text-white">{value || "N/A"}</p>
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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
    const cleanTime = timeString.substring(0, 5);

    const [hours, minutes] = cleanTime.split(":");

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

export default SportsMatchDetails;
