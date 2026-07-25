import { useEffect, useState } from "react";

import {
  HiMegaphone,
  HiRectangleGroup,
  HiBuildingOffice2,
  HiCheckBadge,
  HiPlusCircle,
  HiPencilSquare,
  HiChartBar,
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
    return <div className="text-white text-xl">Loading Dashboard...</div>;
  }

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
          Welcome, {stats.company.companyName}
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your entertainment brand, advertisements and campaigns.
        </p>
      </div>

      {/* COMPANY SUMMARY */}

      <div
        className="
        bg-[#393E46]
        rounded-3xl
        p-6
        border
        border-white/10
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        "
      >
        <div className="flex items-center gap-5">
          {stats.company.logo ? (
            <img
              src={`http://localhost:8000/uploads/${stats.company.logo}`}
              className="
              w-20
              h-20
              rounded-2xl
              object-cover
              "
            />
          ) : (
            <div
              className="
              w-20
              h-20
              rounded-2xl
              bg-[#222831]
              flex
              items-center
              justify-center
              "
            >
              <HiBuildingOffice2 className="text-[#D4A017]" size={40} />
            </div>
          )}

          <div>
            <h2
              className="
              text-2xl
              text-white
              font-bold
              flex
              items-center
              gap-2
              "
            >
              {stats.company.companyName}

              <HiCheckBadge className="text-[#D4A017]" />
            </h2>

            <p className="text-gray-400">Company Dashboard</p>
          </div>
        </div>

        <div>
          <span
            className={`
            px-4
            py-2
            rounded-full
            font-semibold
            text-sm
            
            ${
              stats.company.status === "approved"
                ? "bg-green-500/20 text-green-400"
                : stats.company.status === "rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
            }
            
            `}
          >
            {stats.company.status}
          </span>
        </div>
      </div>

      {/* STAT CARDS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-6
        "
      >
        {/* PROFILE */}

        <DashboardCard
          icon={<HiBuildingOffice2 />}
          title="Company Profile"
          description="Update company information"
          action={() => navigate("/company/profile")}
        />

        {/* ADS */}

        <DashboardCard
          icon={<HiMegaphone />}
          title="Advertisements"
          description={`${stats.advertisements} advertisements created`}
          action={() => navigate("/company/advertisements")}
        />

        {/* CAMPAIGN */}

        <DashboardCard
          icon={<HiRectangleGroup />}
          title="Campaigns"
          description={`${stats.campaigns} campaigns running`}
          action={() => navigate("/company/campaigns")}
        />
      </div>

      {/* QUICK ACTIONS */}

      <div
        className="
        bg-[#393E46]
        rounded-3xl
        p-6
        border
        border-white/10
        "
      >
        <h2
          className="
          text-xl
          text-white
          font-bold
          mb-5
          "
        >
          Quick Actions
        </h2>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          "
        >
          <ActionButton
            icon={<HiPlusCircle />}
            text="Create Advertisement"
            click={() => navigate("/company/advertisements")}
          />

          <ActionButton
            icon={<HiPencilSquare />}
            text="Edit Profile"
            click={() => navigate("/company/profile")}
          />

          <ActionButton
            icon={<HiChartBar />}
            text="View Campaigns"
            click={() => navigate("/company/campaigns")}
          />
        </div>
      </div>

      {/* RECENT ACTIVITY */}

      <div
        className="
        bg-[#393E46]
        rounded-3xl
        p-6
        border
        border-white/10
        "
      >
        <h2
          className="
          text-xl
          text-white
          font-bold
          mb-3
          "
        >
          Recent Activity
        </h2>

        <p className="text-gray-400">
          Your latest advertisements and campaigns will appear here.
        </p>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description, action }) {
  return (
    <div
      onClick={action}
      className="
      bg-[#393E46]
      p-6
      rounded-3xl
      cursor-pointer
      border
      border-white/10
      hover:-translate-y-2
      transition
      "
    >
      <div
        className="
        text-[#D4A017]
        text-4xl
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

      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

function ActionButton({ icon, text, click }) {
  return (
    <button
      onClick={click}
      className="
      bg-[#222831]
      text-white
      p-4
      rounded-xl
      flex
      items-center
      gap-3
      hover:bg-[#D4A017]
      hover:text-black
      transition
      "
    >
      <span className="text-2xl">{icon}</span>

      <span className="font-semibold">{text}</span>
    </button>
  );
}

export default CompanyDashboard;
