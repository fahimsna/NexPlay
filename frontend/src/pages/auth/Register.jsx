import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../api/axiosInstance";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/auth/register", formData);

      const data = response.data;

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration successful");

      if (data.user.role === "company") {
        navigate("/company");
      } else if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center px-5 py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-[#24272D] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Branding Section */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-[#202328] to-[#17191D] border-r border-white/10">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center w-fit group">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#D4A017]
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-[#D4A017]/20
                  group-hover:scale-105
                  transition
                "
              >
                <span className="text-[#17191D] text-xl font-black">N</span>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  Nex<span className="text-[#D4A017]">Play</span>
                </h1>

                <p className="text-xs text-gray-500">
                  Entertainment, simplified.
                </p>
              </div>
            </div>
          </Link>

          {/* Branding Content */}
          <div>
            <p className="text-[#D4A017] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Join NexPlay
            </p>

            <h2 className="text-4xl xl:text-5xl font-black leading-tight">
              Your world of
              <span className="text-[#D4A017]"> entertainment</span>
              <br />
              starts here.
            </h2>

            <p className="mt-6 text-gray-400 leading-7 max-w-md">
              Create your NexPlay account and explore movies, TV shows, sports,
              live events, and more from one place.
            </p>
          </div>

          {/* Bottom */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} NexPlay
          </p>
        </div>

        {/* Right Registration Section */}
        <div className="p-7 sm:p-10 lg:p-12">
          {/* Mobile Logo */}
          <Link
            to="/"
            className="lg:hidden flex items-center justify-center gap-3 mb-8 group"
          >
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#D4A017]
                flex
                items-center
                justify-center
                group-hover:scale-105
                transition
              "
            >
              <span className="text-[#17191D] text-lg font-black">N</span>
            </div>

            <h1 className="text-2xl font-black">
              Nex<span className="text-[#D4A017]">Play</span>
            </h1>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-wider mb-2">
              Get started
            </p>

            <h1 className="text-3xl sm:text-4xl font-black">
              Create your account
            </h1>

            <p className="text-gray-400 mt-2">
              Join NexPlay and start exploring.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-[#17191D]
                  border
                  border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  focus:border-[#D4A017]
                  focus:ring-1
                  focus:ring-[#D4A017]
                  transition
                "
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-[#17191D]
                  border
                  border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  focus:border-[#D4A017]
                  focus:ring-1
                  focus:ring-[#D4A017]
                  transition
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-[#17191D]
                  border
                  border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  focus:border-[#D4A017]
                  focus:ring-1
                  focus:ring-[#D4A017]
                  transition
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-[#17191D]
                  border
                  border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  focus:border-[#D4A017]
                  focus:ring-1
                  focus:ring-[#D4A017]
                  transition
                "
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Type
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-[#17191D]
                  border
                  border-white/10
                  text-white
                  outline-none
                  focus:border-[#D4A017]
                  focus:ring-1
                  focus:ring-[#D4A017]
                  transition
                  cursor-pointer
                "
              >
                <option value="user" className="bg-[#17191D]">
                  Normal User
                </option>

                <option value="company" className="bg-[#17191D]">
                  Entertainment Company
                </option>
              </select>
            </div>

            {/* Company Name */}
            {formData.role === "company" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    px-4
                    py-3.5
                    rounded-xl
                    bg-[#17191D]
                    border
                    border-white/10
                    text-white
                    placeholder-gray-600
                    outline-none
                    focus:border-[#D4A017]
                    focus:ring-1
                    focus:ring-[#D4A017]
                    transition
                  "
                />
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-2
                bg-[#D4A017]
                text-[#17191D]
                font-bold
                py-3.5
                rounded-xl
                hover:bg-[#e7b52b]
                hover:-translate-y-0.5
                active:translate-y-0
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:translate-y-0
                transition-all
                duration-200
                shadow-lg
                shadow-[#D4A017]/10
              "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-gray-400 mt-7">
            Already have an account?
            <Link
              to="/login"
              className="
                text-[#D4A017]
                ml-2
                font-semibold
                hover:text-[#e7b52b]
                transition
              "
            >
              Login
            </Link>
          </p>

          {/* Home */}
          <div className="text-center mt-5">
            <Link
              to="/"
              className="
                text-sm
                text-gray-500
                hover:text-gray-300
                transition
              "
            >
              ← Back to NexPlay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
