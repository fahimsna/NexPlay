import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatsCard from "../components/dahboard/StatsCard";
import RecentActivity from "../components/dahboard/RecentActivity";

import CompanyProfileSummary from "../components/company/CompanyProfileSummary";
import CompanyInfoCard from "../components/company/CompanyInfoCard";

import { getCompanies } from "../services/companyService";

function CompanyDashboard() {
  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const data = await getCompanies();

      if (data.length > 0) {
        setCompany(data[0]);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
          "
        >
          <p className="text-gray-400">Loading Dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="
          space-y-8
        "
      >
        {/* Company Header */}

        {company && <CompanyProfileSummary company={company} dashboard />}

        {/* Page Header */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Company Dashboard
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Welcome back{" "}
            <span
              className="
                text-[#D4A017]
                font-semibold
              "
            >
              {company?.companyName}
            </span>
          </p>
        </div>

        {/* Statistics */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >
          <StatsCard
            title="Company Profile"
            value="100%"
            subtitle="Profile Completed"
          />

          <StatsCard
            title="Advertisements"
            value="0"
            subtitle="Active Advertisements"
          />

          <StatsCard title="Campaigns" value="0" subtitle="Running Campaigns" />

          <StatsCard
            title="Upcoming Content"
            value="0"
            subtitle="Scheduled Releases"
          />
        </div>

        {/* Company Information */}

        {company && <CompanyInfoCard company={company} />}

        {/* Bottom Section */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >
          <RecentActivity company={company} />

          {/* Quick Actions */}

          <div
            className="
              bg-[#1B1D22]
              rounded-3xl
              p-6
              border
              border-white/5
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
            >
              Quick Actions
            </h2>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >
              <button
                className="
                  bg-[#D4A017]
                  text-[#17191D]
                  font-semibold
                  py-3
                  rounded-xl
                  hover:opacity-90
                  transition
                "
              >
                Edit Company
              </button>

              <button
                className="
                  bg-[#353941]
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-[#40444D]
                  transition
                "
              >
                Add Advertisement
              </button>

              <button
                className="
                  bg-[#353941]
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-[#40444D]
                  transition
                "
              >
                Create Campaign
              </button>

              <button
                className="
                  bg-[#353941]
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-[#40444D]
                  transition
                "
              >
                Add Upcoming Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CompanyDashboard;
