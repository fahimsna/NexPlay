import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StatsCard from "../../components/dashboard/StatsCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import CompanyProfileSummary from "../../components/company/CompanyProfileSummary";
import CompanyInfoCard from "../../components/company/CompanyInfoCard";

import {
  HiBuildingOffice2,
  HiMegaphone,
  HiRocketLaunch,
  HiFilm,
} from "react-icons/hi2";

import { getCompanies } from "../../services/companyService";

function readStoredArray(key) {
  try {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      return [];
    }

    const parsedValue = JSON.parse(savedValue);

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return [];
  }
}

function CompanyDashboard() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

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
    try {
      const data = await getCompanies();

      if (Array.isArray(data) && data.length > 0) {
        setCompany(data[0]);
      }
    } catch (error) {
      console.log("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

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
    </div>
  );
}

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
      </div>
    </Link>
  );
}

export default CompanyDashboard;