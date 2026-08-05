import { useEffect, useState } from "react";

import ReleaseCalendar from "../components/calendar/ReleaseCalendar";
import ReleaseDetails from "../components/calendar/ReleaseDetails";
import { getUpcomingContents } from "../services/upcomingService";

function UpcomingReleaseCalendar() {
  const [releases, setReleases] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUpcomingReleases();
  }, []);

  const fetchUpcomingReleases = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUpcomingContents();

      setReleases(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load upcoming releases:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load upcoming releases.",
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedReleases = releases.filter((item) => {
    if (!item.releaseDate || !selectedDate) {
      return false;
    }

    return item.releaseDate.split("T")[0] === selectedDate;
  });

  return (
    <div className="min-h-screen bg-[#111315] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Upcoming Release Calendar
          </h1>

          <p className="mt-2 text-gray-400">
            Select a highlighted date to view scheduled releases.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl bg-[#17191D] p-6 text-gray-300">
            Loading upcoming releases...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!loading && (
          <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
            <ReleaseCalendar
              releases={releases}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            <ReleaseDetails
              selectedDate={selectedDate}
              releases={selectedReleases}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingReleaseCalendar;