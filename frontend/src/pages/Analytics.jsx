import DashboardLayout from "../layouts/DashboardLayout";

import AnalyticsCard from "../components/analytics/AnalyticsCard";

import {
  HiMegaphone,
  HiFilm,
  HiChartBar,
  HiBuildingOffice2,
} from "react-icons/hi2";

function Analytics() {
  const analyticsData = [
    {
      title: "Company Profile",
      value: "100%",
      subtitle: "Profile Completion",
      icon: HiBuildingOffice2,
    },

    {
      title: "Advertisements",
      value: "0",
      subtitle: "Total Advertisements",
      icon: HiMegaphone,
    },

    {
      title: "Upcoming Content",
      value: "0",
      subtitle: "Scheduled Releases",
      icon: HiFilm,
    },

    {
      title: "Campaign Performance",
      value: "0",
      subtitle: "Active Campaigns",
      icon: HiChartBar,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Analytics
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Track your company performance
          </p>
        </div>

        {/* Cards */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >
          {analyticsData.map((item, index) => (
            <AnalyticsCard key={index} {...item} />
          ))}
        </div>

        {/* Chart Placeholder */}

        <div
          className="
            bg-[#1B1D22]
            rounded-3xl
            border
            border-white/5
            p-8
            h-80
            flex
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <HiChartBar
              size={60}
              className="
                text-[#D4A017]
                mx-auto
              "
            />

            <h2
              className="
                text-white
                text-xl
                font-bold
                mt-4
              "
            >
              Performance Analytics
            </h2>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Charts will appear here after campaign data integration
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;
