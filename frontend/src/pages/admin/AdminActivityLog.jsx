import { useEffect, useState, useCallback } from "react";

import { getActivityLog } from "../../services/adminService";

/*
|--------------------------------------------------------------------------
| ADMIN ACTIVITY LOG
|--------------------------------------------------------------------------
|
| Sprint 1: audit trail of admin actions (company approve/reject, etc.)
|
|--------------------------------------------------------------------------
*/

const ACTION_LABELS = {
  COMPANY_VERIFIED: { label: "Company Verified", tone: "text-green-400 bg-green-500/10 border-green-500/20" },
  COMPANY_REJECTED: { label: "Company Rejected", tone: "text-red-400 bg-red-500/10 border-red-500/20" },
};

function formatAction(action) {
  const known = ACTION_LABELS[action];

  if (known) {
    return known;
  }

  return {
    label: action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    tone: "text-gray-300 bg-white/5 border-white/10",
  };
}

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function AdminActivityLog() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getActivityLog(page, 15);

      setLogs(data.logs || []);
      setTotalPages(data.meta?.totalPages || 1);
      setTotal(data.meta?.total || 0);
    } catch (err) {
      console.error("Activity log error:", err);
      setError("Could not load activity log.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">Admin</p>

      <h1 className="mt-2 text-3xl sm:text-4xl font-black">Activity Log</h1>

      <p className="mt-2 text-gray-400">
        Track all administrative actions across the platform.
      </p>

      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="mt-6 bg-[#24272D] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="text-gray-400 text-center py-10">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No activity logs found.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#1B1E22] text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">When</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => {
                const { label, tone } = formatAction(log.action);

                return (
                  <tr
                    key={log._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${tone}`}
                      >
                        {label}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                      {log.details}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-400">
                      {log.adminId?.fullName || log.adminId?.email || "Unknown"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {timeAgo(log.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages} ({total} total)
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-[#24272D] border border-white/10 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-[#24272D] border border-white/10 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminActivityLog;
