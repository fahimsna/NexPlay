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
    <div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center px-5 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-[120px]" />

      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="flex justify-center mb-7">
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-2xl
              px-5
              py-3
              transition-all
              duration-200
              hover:bg-white/5
            "
            aria-label="Go to NexPlay home"
          >
            {/* NexPlay Logo Mark */}
            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-[#D4A017]
                flex
                items-center
                justify-center
                shadow-lg
                shadow-[#D4A017]/20
                group-hover:scale-105
                transition-transform
              "
            >
              <span className="text-[#0b0f14] text-2xl font-black">N</span>
            </div>

            <div className="text-left">
              <h2 className="text-2xl font-black tracking-tight">
                Nex<span className="text-[#D4A017]">Play</span>
              </h2>

              <p className="text-xs text-gray-500">Entertainment Explorer</p>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div
          className="
            bg-[#151a21]
            border
            border-white/10
            rounded-3xl
            shadow-2xl
            overflow-hidden
          "
        >
          {/* Card Header */}
          <div className="px-8 pt-9 pb-7 border-b border-white/10">
            <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>

            <p className="mt-2 text-gray-400 text-sm">
              Sign in to continue exploring NexPlay.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="
                    w-full
                    px-4
                    py-3.5
                    rounded-xl
                    bg-[#0b0f14]
                    border
                    border-white/10
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#D4A017]
                    focus:ring-2
                    focus:ring-[#D4A017]/10
                    hover:border-white/20
                  "
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="
                    w-full
                    px-4
                    py-3.5
                    rounded-xl
                    bg-[#0b0f14]
                    border
                    border-white/10
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#D4A017]
                    focus:ring-2
                    focus:ring-[#D4A017]/10
                    hover:border-white/20
                  "
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-3.5
                  rounded-xl
                  bg-[#D4A017]
                  text-[#0b0f14]
                  font-bold
                  shadow-lg
                  shadow-[#D4A017]/10
                  transition-all
                  duration-200
                  hover:bg-[#e2b12a]
                  hover:-translate-y-0.5
                  active:translate-y-0
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="
                        w-4
                        h-4
                        border-2
                        border-[#0b0f14]/30
                        border-t-[#0b0f14]
                        rounded-full
                        animate-spin
                      "
                    />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-7 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="
                    text-[#D4A017]
                    font-semibold
                    hover:text-[#e2b12a]
                    transition
                  "
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-5">
          <Link
            to="/"
            className="
              text-sm
              text-gray-500
              hover:text-[#D4A017]
              transition
            "
          >
            ← Back to NexPlay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
