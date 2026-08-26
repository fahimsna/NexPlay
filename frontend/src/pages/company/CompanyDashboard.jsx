import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";

import StatsCard from "../../components/dashboard/StatsCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import CompanyProfileSummary from "../../components/company/CompanyProfileSummary";
import CompanyInfoCard from "../../components/company/CompanyInfoCard";
=======
>>>>>>> dev

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

<<<<<<< HEAD
  const [advertisementCount, setAdvertisementCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    fetchCompany();
    updateDashboardCounts();

    window.addEventListener(
      "dashboardDataChanged",
      updateDashboardCounts,
    );

    return () => {
      window.removeEventListener(
        "dashboardDataChanged",
        updateDashboardCounts,
      );
    };
  }, []);

  const updateDashboardCounts = () => {
    const advertisements = readStoredArray(
      "nexplayAdvertisements",
    );

    const campaigns = readStoredArray("nexplayCampaigns");

    const activeAdvertisements = advertisements.filter(
      (advertisement) =>
        String(advertisement.status)
          .trim()
          .toLowerCase() === "active",
    );

    const activeCampaigns = campaigns.filter(
      (campaign) =>
        String(campaign.status)
          .trim()
          .toLowerCase() === "active",
    );

    setAdvertisementCount(activeAdvertisements.length);
    setCampaignCount(activeCampaigns.length);
  };

  const fetchCompany = async () => {
=======
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
>>>>>>> dev
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {company && (
        <CompanyProfileSummary
          company={company}
          dashboard
        />
      )}

      <div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Company Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome back{" "}
          <span className="font-semibold text-[#D4A017]">
            {company?.companyName || "Company"}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Company Profile"
          value="100%"
          subtitle="Profile Completed"
        />

        <Link
          to="/company/advertisements"
          className="block rounded-3xl transition hover:-translate-y-1 hover:ring-2 hover:ring-[#D4A017]/60"
        >
          <StatsCard
            title="Advertisements"
            value={advertisementCount}
            subtitle="Active Advertisements"
          />
        </Link>

        <Link
          to="/company/campaigns"
          className="block rounded-3xl transition hover:-translate-y-1 hover:ring-2 hover:ring-[#D4A017]/60"
        >
          <StatsCard
            title="Campaigns"
            value={campaignCount}
            subtitle="Running Campaigns"
          />
        </Link>

        <Link
          to="/company/upcoming-content"
          className="block rounded-3xl transition hover:-translate-y-1 hover:ring-2 hover:ring-[#D4A017]/60"
        >
          <StatsCard
            title="Upcoming Content"
            value="0"
            subtitle="Scheduled Releases"
          />
        </Link>
      </div>

      {company && <CompanyInfoCard company={company} />}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentActivity company={company} />

        <div className="rounded-3xl border border-white/10 bg-[#1B1D22] p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage your company activities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ActionCard
              title="Edit Company"
              description="Update your company profile information"
              path="/company/profile"
              icon={HiBuildingOffice2}
            />

            <ActionCard
              title="Create Advertisement"
              description="Promote movies, shows and content"
              path="/company/advertisements"
              icon={HiMegaphone}
            />

            <ActionCard
              title="Create Campaign"
              description="Manage marketing campaigns"
              path="/company/campaigns"
              icon={HiRocketLaunch}
            />

            <ActionCard
              title="Add Content"
              description="Manage upcoming entertainment releases"
              path="/company/upcoming-content"
              icon={HiFilm}
            />
          </div>
        </div>
      </div>
=======
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
>>>>>>> dev
    </div>
  );
}

<<<<<<< HEAD
function ActionCard({
  title,
  description,
  path,
  icon: Icon,
}) {
  return (
    <Link
      to={path}
      className="group rounded-2xl border border-white/10 bg-[#24272D] p-5 transition hover:-translate-y-1 hover:border-[#D4A017]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A017]/10 transition group-hover:bg-[#D4A017]">
          <Icon
            size={24}
            className="text-[#D4A017] transition group-hover:text-[#17191D]"
          />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-5 text-gray-400">
            {description}
          </p>
        </div>
=======
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
>>>>>>> dev
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