import {
  HiMegaphone,
  HiCheckCircle,
  HiPauseCircle,
  HiCheckBadge,
} from "react-icons/hi2";

function AdvertisementStats({ advertisements }) {
  const total = advertisements.length;

  const active = advertisements.filter((ad) => ad.status === "Active").length;

  const paused = advertisements.filter((ad) => ad.status === "Paused").length;

  const completed = advertisements.filter(
    (ad) => ad.status === "Completed",
  ).length;

  const stats = [
    {
      title: "Total Ads",
      value: total,
      icon: HiMegaphone,
      color: "bg-blue-500",
    },

    {
      title: "Active",
      value: active,
      icon: HiCheckCircle,
      color: "bg-green-500",
    },

    {
      title: "Paused",
      value: paused,
      icon: HiPauseCircle,
      color: "bg-yellow-500",
    },

    {
      title: "Completed",
      value: completed,
      icon: HiCheckBadge,
      color: "bg-purple-500",
    },
  ];

  return (
    <div
      className="
grid
grid-cols-1
xs:grid-cols-2
lg:grid-cols-4
gap-4
sm:gap-6
mt-8
"
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
bg-[#393E46]
border
border-white/10
rounded-2xl
p-4
sm:p-6
flex
items-center
justify-between
gap-3
hover:border-[#D4A017]
transition
"
          >
            <div>
              <p
                className="
text-gray-400
text-sm
"
              >
                {item.title}
              </p>

              <h2
                className="
text-2xl
sm:text-3xl
font-bold
text-white
mt-2
"
              >
                {item.value}
              </h2>
            </div>

            <div
              className={`
${item.color}
w-12
h-12
sm:w-14
sm:h-14
rounded-xl
flex
items-center
justify-center
shrink-0
`}
            >
              <Icon className="text-white" size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdvertisementStats;
