import { useEffect, useState } from "react";

import {
  HiMegaphone,
  HiRectangleGroup,
  HiBuildingOffice2,
  HiChartBar,
  HiCheckBadge,
} from "react-icons/hi2";

import { getDashboardStats } from "../../services/dashboardService";

import { useNavigate } from "react-router-dom";

function CompanyDashboard() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <div className="text-white text-lg">Loading Dashboard...</div>;
  }

  return (
    <div
      className="
      space-y-8
      "
    >
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
          Welcome, {stats.company?.companyName}
        </h1>

        <p
          className="
          text-gray-400
          mt-2
          "
        >
          Manage your company activities and monitor performance
        </p>
      </div>

      {/* COMPANY STATUS */}

      <div
        className="
        bg-[#393E46]
        border
        border-white/10
        rounded-3xl
        p-6
        flex
        flex-col
        sm:flex-row
        sm:items-center
        justify-between
        gap-5
        "
      >
        <div>
          <h2
            className="
            text-xl
            font-bold
            text-white
            "
          >
            Company Status
          </h2>

          <p
            className="
            text-gray-400
            mt-2
            "
          >
            Your company verification status
          </p>
        </div>

        <div
          className="
          flex
          items-center
          gap-2
          bg-[#222831]
          px-5
          py-3
          rounded-xl
          "
        >
          <HiCheckBadge className="text-[#D4A017]" size={25} />

          <span
            className="
            text-white
            font-semibold
            capitalize
            "
          >
            {stats.company?.status}
          </span>
        </div>
      </div>

      {/* DASHBOARD CARDS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
      >
        {/* PROFILE */}

        <DashboardCard
          icon={<HiBuildingOffice2 size={32} />}
          title="Company Profile"
          description="Manage company information"
          onClick={() => navigate("/company/profile")}
        />

        {/* ADS */}

        <DashboardCard
          icon={<HiMegaphone size={32} />}
          title="Advertisements"
          description={`${stats.advertisements} Total Ads`}
          onClick={() => navigate("/company/advertisements")}
        />

        {/* CAMPAIGNS */}

        <DashboardCard
          icon={<HiRectangleGroup size={32} />}
          title="Campaigns"
          description={`${stats.campaigns} Total Campaigns`}
          onClick={() => navigate("/company/campaigns")}
        />

        {/* ANALYTICS */}

        <DashboardCard
          icon={<HiChartBar size={32} />}
          title="Analytics"
          description="View company performance"
          onClick={() => navigate("/company/analytics")}
        />
      </div>

      {/* QUICK SUMMARY */}

      <div
        className="
        bg-[#393E46]
        border
        border-white/10
        rounded-3xl
        p-6
        "
      >
        <h2
          className="
          text-xl
          font-bold
          text-white
          mb-5
          "
        >
          Quick Summary
        </h2>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-5
          "
        >
          <SummaryBox title="Advertisements" value={stats.advertisements} />

          <SummaryBox title="Campaigns" value={stats.campaigns} />

          <SummaryBox title="Account Status" value={stats.company?.status} />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
bg-[#393E46]

border
border-white/10

rounded-3xl

p-6

cursor-pointer

hover:scale-105

transition

duration-300

"
    >
      <div
        className="
text-[#D4A017]
"
      >
        {icon}
      </div>

      <h2
        className="
text-white
text-xl
font-bold
mt-5
"
      >
        {title}
      </h2>

      <p
        className="
text-gray-400
mt-2
text-sm
"
      >
        {description}
      </p>
    </div>
  );
}

function SummaryBox({ title, value }) {
  return (
    <div
      className="
bg-[#222831]
rounded-2xl
p-5
"
    >
      <p
        className="
text-gray-400
text-sm
"
      >
        {title}
      </p>

      <h3
        className="
text-white
text-2xl
font-bold
mt-2
capitalize
"
      >
        {value}
      </h3>
    </div>
  );
}

export default CompanyDashboard;
