import { useEffect, useState } from "react";
import { HiArrowTopRightOnSquare, HiExclamationTriangle } from "react-icons/hi2";

import { getAvailabilityForContent } from "../../services/streamingAvailabilityService";

const ACCESS_LABELS = {
  subscription: "Subscription",
  rental: "Rent",
  purchase: "Buy",
  free: "Free",
};

function WhereToWatch({ tmdbId, mediaType, title }) {
  const [availability, setAvailability] = useState([]);

  const [loading, setLoading] = useState(true);

  const [notice, setNotice] = useState("");

  useEffect(() => {
    loadAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tmdbId, mediaType]);

  async function loadAvailability() {
    try {
      setLoading(true);

      const data = await getAvailabilityForContent(mediaType, tmdbId);

      setAvailability(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleWatch(entry) {
    if (!entry.isVerified || !entry.redirectUrl) {
      setNotice(
        `${entry.platform?.name || "This platform"}'s link isn't available right now. Please try another platform.`,
      );

      return;
    }

    setNotice("");

    window.open(entry.redirectUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="
        mt-12
        bg-[#24272D]
        border
        border-white/10
        rounded-3xl
        p-8
      "
    >
      <h2 className="text-3xl font-bold">Where to Watch</h2>

      <p className="text-gray-400 mt-3 leading-7">
        NexPlay helps you discover entertainment. We never host or stream
        content directly — select a platform below to be securely
        redirected to where {title || "this title"} is officially available.
      </p>

      {notice && (
        <div
          className="
            mt-5
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-500/10
            border
            border-red-500/30
            text-red-300
            text-sm
          "
        >
          <HiExclamationTriangle className="shrink-0" />
          {notice}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 mt-6">Checking availability...</p>
      ) : availability.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-6">
          {availability.map((entry) => (
            <button
              key={entry._id}
              type="button"
              onClick={() => handleWatch(entry)}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-[#17191D]
                border
                border-white/10
                hover:border-[#D4A017]
                hover:text-[#D4A017]
                transition
                cursor-pointer
                disabled:opacity-40
              "
            >
              {entry.platform?.name || "Unknown Platform"}

              <span className="text-xs text-gray-400">
                ({ACCESS_LABELS[entry.accessType] || entry.accessType})
              </span>

              <HiArrowTopRightOnSquare className="text-xs" />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-6">
          No official streaming information is available for this title yet.
        </p>
      )}
    </div>
  );
}

export default WhereToWatch;