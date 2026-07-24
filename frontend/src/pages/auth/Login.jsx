import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { login } from "../../controllers/authController";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await login(formData, auth);

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    const role = result.data.user.role;

    switch (role) {
      case "company":
        navigate("/company");
        break;

      case "admin":
        navigate("/admin");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4A017] text-black font-bold py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#D4A017] font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
