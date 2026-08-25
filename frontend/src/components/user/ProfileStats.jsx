import {
  HiFilm,
  HiTv,
  HiTrophy,
  HiChatBubbleLeftRight,
  HiBolt,
} from "react-icons/hi2";

function ProfileStats({ stats = {} }) {
  const items = [
    {
      label: "Movies Viewed",
      value: stats.moviesViewed || 0,
      icon: HiFilm,
    },
    {
      label: "Series Viewed",
      value: stats.seriesViewed || 0,
      icon: HiTv,
    },
    {
      label: "Sports Viewed",
      value: stats.sportsViewed || 0,
      icon: HiTrophy,
    },
    {
      label: "Reviews",
      value: stats.reviews || 0,
      icon: HiChatBubbleLeftRight,
    },
    {
      label: "Total Activity",
      value: stats.totalActivity || 0,
      icon: HiBolt,
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-wider">
          Your Activity
        </p>

        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Profile Statistics
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-5
          gap-4
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                bg-[#24272D]
                border
                border-white/10
                rounded-2xl
                p-5
                hover:border-[#D4A017]/40
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
                  mb-4
                "
              >
                <Icon size={22} className="text-[#D4A017]" />
              </div>

              <p className="text-2xl font-black text-white">{item.value}</p>

              <p className="text-sm text-gray-400 mt-1">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProfileStats;
