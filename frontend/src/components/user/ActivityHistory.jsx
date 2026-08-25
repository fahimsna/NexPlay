import { HiClock, HiFilm, HiTrophy } from "react-icons/hi2";

function ActivityHistory({ activities = [] }) {
  const getIcon = (type) => {
    if (type === "sports") {
      return HiTrophy;
    }

    return HiFilm;
  };

  return (
    <section>
      <div className="mb-5">
        <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-wider">
          Your History
        </p>

        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Activity History
        </h2>
      </div>

      <div
        className="
          bg-[#24272D]
          border
          border-white/10
          rounded-3xl
          overflow-hidden
        "
      >
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <HiClock size={38} className="mx-auto text-gray-500" />

            <p className="text-gray-400 mt-4">No activity yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {activities.map((activity, index) => {
              const Icon = getIcon(activity.type);

              return (
                <div
                  key={`${activity.id}-${index}`}
                  className="
                    p-5
                    flex
                    items-center
                    gap-4
                    hover:bg-white/2
                    transition
                  "
                >
                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-[#D4A017]/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Icon size={21} className="text-[#D4A017]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold truncate">
                      {activity.title}
                    </p>

                    <p className="text-sm text-gray-500 capitalize mt-1">
                      {activity.type || "content"}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    {activity.createdAt
                      ? new Date(activity.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ActivityHistory;
