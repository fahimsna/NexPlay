import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getTeamById } from "../services/sportsService";

function SportsTeamDetails() {
  const { id } = useParams();

  const [team, setTeam] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTeamById(id);

      setTeam(data);
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
          <div className="animate-spin w-10 h-10 border-2 border-[#D4A017] border-t-transparent rounded-full mx-auto" />

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

          <div className="mt-8 bg-[#24272D] border border-white/10 rounded-3xl overflow-hidden">
            {/* FANART */}

            {team.strTeamFanart1 && (
              <div
                className="h-56 sm:h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${team.strTeamFanart1})`,
                }}
              />
            )}

            <div className="p-7 sm:p-10">
              {/* TEAM HEADER */}

              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center">
                  {team.strTeamBadge ? (
                    <img
                      src={team.strTeamBadge}
                      alt={team.strTeam}
                      className="w-24 h-24 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">⚽</span>
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-[#D4A017] uppercase text-sm tracking-[2px]">
                    {team.strSport}
                  </p>

                  <h1 className="mt-2 text-4xl font-black">{team.strTeam}</h1>

                  <p className="mt-2 text-gray-400">{team.strLeague}</p>
                </div>
              </div>

              {/* INFORMATION */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                <Info label="Country" value={team.strCountry} />

                <Info label="Stadium" value={team.strStadium} />

                <Info label="Founded" value={team.intFormedYear} />

                <Info label="Manager" value={team.strManager} />
              </div>

              {/* DESCRIPTION */}

              {team.strDescriptionEN && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold">About the Team</h2>

                  <p className="mt-4 text-gray-400 leading-7">
                    {team.strDescriptionEN}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-[#1B1E22] rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>

      <p className="mt-2 font-semibold">{value || "N/A"}</p>
    </div>
  );
}

export default SportsTeamDetails;
