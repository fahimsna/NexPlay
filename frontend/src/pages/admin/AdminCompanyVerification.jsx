import { useEffect, useState } from "react";

import {
  getAllCompanies,
  approveCompany,
  rejectCompany,
} from "../../services/adminService";

/*
|--------------------------------------------------------------------------
| ADMIN COMPANY VERIFICATION
|--------------------------------------------------------------------------
|
| Sprint 1: Company Verification
|
|--------------------------------------------------------------------------
*/

const TABS = ["pending", "approved", "rejected"];

function AdminCompanyVerification() {
  const [activeTab, setActiveTab] = useState("pending");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    load();
  }, [activeTab]);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllCompanies(activeTab);
      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load companies error:", err);
      setError("Could not load companies.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setActioningId(id);
      await approveCompany(id);
      await load();
    } catch (err) {
      console.error("Approve error:", err);
      setError("Could not approve company.");
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActioningId(id);
      await rejectCompany(id, rejectReason);
      setRejectingId(null);
      setRejectReason("");
      await load();
    } catch (err) {
      console.error("Reject error:", err);
      setError("Could not reject company.");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div>
      <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">Admin</p>

      <h1 className="mt-2 text-3xl sm:text-4xl font-black">
        Company Verification
      </h1>

      <p className="mt-2 text-gray-400">
        Review and approve or reject company registrations.
      </p>

      {/* TABS */}
      <div className="flex gap-3 mt-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl font-semibold capitalize transition ${
              activeTab === tab
                ? "bg-[#D4A017] text-[#17191D]"
                : "bg-[#24272D] text-gray-400 border border-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      {/* LIST */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-gray-400 text-center py-10">Loading...</p>
        ) : companies.length === 0 ? (
          <div className="bg-[#24272D] border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-400">
              No {activeTab} companies right now.
            </p>
          </div>
        ) : (
          companies.map((company) => (
            <div
              key={company._id}
              className="bg-[#24272D] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{company.companyName}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Owner: {company.ownerId?.fullName || "Unknown"} (
                    {company.ownerId?.email})
                  </p>

                  {company.description && (
                    <p className="text-sm text-gray-400 mt-2 max-w-2xl">
                      {company.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                    {company.website && <span>🔗 {company.website}</span>}
                    {company.industry && <span>🏷 {company.industry}</span>}
                    {company.location && <span>📍 {company.location}</span>}
                  </div>

                  {company.status === "rejected" && company.rejectionReason && (
                    <p className="mt-3 text-sm text-red-400">
                      Rejection reason: {company.rejectionReason}
                    </p>
                  )}
                </div>

                {activeTab === "pending" && (
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(company._id)}
                        disabled={actioningId === company._id}
                        className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition disabled:opacity-50"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          setRejectingId(
                            rejectingId === company._id ? null : company._id,
                          )
                        }
                        disabled={actioningId === company._id}
                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>

                    {rejectingId === company._id && (
                      <div className="w-full sm:w-72">
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Reason for rejection..."
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg bg-[#17191D] border border-white/10 outline-none focus:border-[#D4A017] text-sm text-white resize-none"
                        />

                        <button
                          onClick={() => handleReject(company._id)}
                          disabled={actioningId === company._id}
                          className="mt-2 w-full px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50"
                        >
                          Confirm Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminCompanyVerification;
