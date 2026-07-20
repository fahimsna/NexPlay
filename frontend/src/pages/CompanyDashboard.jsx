import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";

import {
  HiBuildingOffice2,
  HiMegaphone,
  HiFilm,
  HiChartBar,
} from "react-icons/hi2";

function CompanyDashboard() {
  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <section
        className="
          bg-linear-to-r
          from-[#2A2D34]
          to-[#1E2126]
          border
          border-white/10
          rounded-3xl
          p-6
          lg:p-8
          mb-8
        "
      >
        <p className="text-sm uppercase tracking-[3px] text-[#D4A017]">
          Welcome Back
        </p>

        <h1 className="mt-3 text-3xl lg:text-4xl font-black">
          Company Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Manage your company profile, campaigns and entertainment content from
          one central dashboard.
        </p>
      </section>

      {/* Statistics */}
      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <StatsCard
          title="Company"
          value="1"
          subtitle="Registered Company"
          icon={<HiBuildingOffice2 size={28} />}
        />

        <StatsCard
          title="Campaigns"
          value="0"
          subtitle="Active Campaigns"
          icon={<HiMegaphone size={28} />}
        />

        <StatsCard
          title="Content"
          value="0"
          subtitle="Published Content"
          icon={<HiFilm size={28} />}
        />

        <StatsCard
          title="Views"
          value="0"
          subtitle="Total Views"
          icon={<HiChartBar size={28} />}
        />
      </section>

      {/* Lower Section */}
      <section
        className="
          mt-8
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* Company Information */}
        <div
          className="
            xl:col-span-2
            bg-[#2A2D34]
            rounded-3xl
            border
            border-white/10
            p-6
          "
        >
          <h2 className="text-2xl font-bold">Company Information</h2>

          <p className="mt-2 text-gray-400">
            Your company profile will appear here once connected to the backend.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Company Name</p>

              <h3 className="mt-2 font-semibold">—</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Industry</p>

              <h3 className="mt-2 font-semibold">—</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Website</p>

              <h3 className="mt-2 font-semibold">—</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Verification</p>

              <h3 className="mt-2 text-[#D4A017] font-semibold">Pending</h3>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="
            bg-[#2A2D34]
            rounded-3xl
            border
            border-white/10
            p-6
          "
        >
          <h2 className="text-2xl font-bold">Recent Activity</h2>

          <div className="mt-6 space-y-5">
            <div className="border-l-2 border-[#D4A017] pl-4">
              <h3 className="font-medium">Company profile created</h3>

              <p className="text-sm text-gray-400">Just now</p>
            </div>

            <div className="border-l-2 border-white/10 pl-4">
              <h3 className="font-medium text-gray-500">No campaigns yet</h3>
            </div>

            <div className="border-l-2 border-white/10 pl-4">
              <h3 className="font-medium text-gray-500">
                No entertainment content yet
              </h3>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default CompanyDashboard;
