function formatSelectedDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const [year, month, day] = dateValue
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

function ReleaseDetails({
  selectedDate,
  releases = [],
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#17191D] p-5 shadow-xl sm:p-6">
      <h2 className="text-2xl font-bold text-white">
        Release Details
      </h2>

      {!selectedDate && (
        <p className="mt-4 text-gray-400">
          Select a date from the calendar to view releases.
        </p>
      )}

      {selectedDate && (
        <p className="mt-2 text-yellow-400">
          {formatSelectedDate(selectedDate)}
        </p>
      )}

      {selectedDate && releases.length === 0 && (
        <div className="mt-6 rounded-xl bg-[#23272F] p-5 text-gray-400">
          No releases are scheduled for this date.
        </div>
      )}

      <div className="mt-6 space-y-5">
        {releases.map((item) => (
          <article
            key={item._id}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#23272F]"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-40 items-center justify-center bg-[#2d323c] text-gray-500">
                No poster available
              </div>
            )}

            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs capitalize text-yellow-400">
                  {item.status || "pending"}
                </span>
              </div>

              {item.genre && (
                <p className="mt-2 text-sm text-yellow-400">
                  {item.genre}
                </p>
              )}

              <p className="mt-3 leading-6 text-gray-400">
                {item.description ||
                  "No description available."}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ReleaseDetails;