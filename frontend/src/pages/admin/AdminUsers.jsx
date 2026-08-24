import { useEffect, useState } from "react";

import { getAllUsers } from "../../services/adminService";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load users error:", err);
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">Admin</p>

      <h1 className="mt-2 text-3xl sm:text-4xl font-black">Users</h1>

      <p className="mt-2 text-gray-400">All registered users on NexPlay.</p>

      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="mt-6 bg-[#24272D] border border-white/10 rounded-2xl overflow-x-auto">
        {loading ? (
          <p className="text-gray-400 text-center py-10">Loading...</p>
        ) : (
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#1B1E22] text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4 text-gray-400">{user.username}</td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        user.role === "admin"
                          ? "bg-[#D4A017]/20 text-[#D4A017]"
                          : user.role === "company"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
