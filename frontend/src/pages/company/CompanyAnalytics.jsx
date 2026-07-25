import {
  HiChartBar,
  HiMegaphone,
  HiRocketLaunch,
  HiBuildingOffice2,
} from "react-icons/hi2";

function CompanyAnalytics() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1
          className="
          text-3xl
          md:text-4xl
          font-bold
          text-white
          "
        >
          Company Analytics
        </h1>

        <p
          className="
          text-gray-400
          mt-2
          "
        >
          Track your company's performance
        </p>
      </div>

      {/* ANALYTICS CARDS */}

      <div
        className="
        grid

        grid-cols-1

        sm:grid-cols-2

        xl:grid-cols-4

        gap-6
        "
      >
        <AnalyticsCard
          icon={<HiBuildingOffice2 size={30} />}
          title="Company Views"
          value="245"
        />

        <AnalyticsCard
          icon={<HiMegaphone size={30} />}
          title="Advertisements"
          value="12"
        />

        <AnalyticsCard
          icon={<HiRocketLaunch size={30} />}
          title="Campaign Reach"
          value="8.4K"
        />

        <AnalyticsCard
          icon={<HiChartBar size={30} />}
          title="Engagement"
          value="72%"
        />
      </div>

      {/* PERFORMANCE */}

      <div
        className="
        bg-[#393E46]

        rounded-3xl

        p-5
        sm:p-6
        lg:p-8

        border
        border-white/10
        "
      >
        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          text-white
          mb-6
          "
        >
          Performance Overview
        </h2>

        <div className="space-y-6">
          <Progress title="Campaign Success" value="60%" />

          <Progress title="Audience Growth" value="85%" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({
  icon,

  title,

  value,
}) {
  return (
    <div
      className="
      bg-[#24272D]

      rounded-3xl

      p-5
      sm:p-6

      border
      border-white/10

      "
    >
      <div className="text-[#D4A017]">{icon}</div>

      <h3
        className="
        text-gray-400

        mt-5

        text-sm
        sm:text-base

        "
      >
        {title}
      </h3>

      <p
        className="
        text-white

        text-3xl

        font-bold

        mt-2

        "
      >
        {value}
      </p>
    </div>
  );
}

function Progress({
  title,

  value,
}) {
  return (
    <div>
      <div
        className="
        flex
        justify-between
        mb-3
        text-sm
        "
      >
        <span className="text-gray-300">{title}</span>

        <span className="text-white">{value}</span>
      </div>

      <div
        className="
        w-full
        bg-[#222831]
        rounded-full
        h-3
        "
      >
        <div
          className="
          bg-[#D4A017]
          h-3
          rounded-full
          "
          style={{
            width: value,
          }}
        />
      </div>
    </div>
  );
}

export default CompanyAnalytics;
