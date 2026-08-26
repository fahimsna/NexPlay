import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  HiUsers,
  HiBuildingOffice2,
  HiClock,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi2";

import { getDashboardStats } from "../../services/adminService";

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
|
| Sprint 1: Admin Dashboard
|
|--------------------------------------------------------------------------
*/

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Admin dashboard error:", err);
      setError("Could not load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  const cards = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers,
          icon: HiUsers,
        },
        {
          title: "Total Companies",
          value: stats.totalCompanies,
          icon: HiBuildingOffice2,
        },
        {
          title: "Pending Verification",
          value: stats.pendingCompanies,
          icon: HiClock,
          highlight: true,
        },
        {
          title: "Approved",
          value: stats.approvedCompanies,
          icon: HiCheckCircle,
        },
        {
          title: "Rejected",
          value: stats.rejectedCompanies,
          icon: HiXCircle,
        },
      ]
    : [];

  return (
    <div>
      <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">
        Admin
      </p>

      <h1 className="mt-2 text-3xl sm:text-4xl font-black">Dashboard</h1>

      <p className="mt-2 text-gray-400">
        Platform-wide stats and company verification overview.
      </p>

      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`bg-[#24272D] border rounded-2xl p-6 ${
                    card.highlight
                      ? "border-[#D4A017]/50"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#D4A017]/10 flex items-center justify-center">
                      <Icon size={22} className="text-[#D4A017]" />
                    </div>
                  </div>

                  <h2 className="mt-5 text-3xl font-black">{card.value}</h2>

                  <p className="mt-1 text-gray-400">{card.title}</p>
                </div>
              );
            })}
          </div>

          {stats?.pendingCompanies > 0 && (
            <div className="mt-8 bg-[#D4A017]/10 border border-[#D4A017]/30 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
              <p className="text-[#D4A017] font-semibold">
                {stats.pendingCompanies} company
                {stats.pendingCompanies !== 1 ? "ies" : "y"} waiting on
                verification.
              </p>

              <Link
                to="/admin/companies"
                className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-[#17191D] font-semibold hover:scale-105 transition"
              >
                Review Now
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
