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
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#222831]
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-[#393E46]
        rounded-3xl
        p-8
        border
        border-white/10
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-white
          text-center
          mb-6
          "
        >
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            outline-none
            "
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            outline-none
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            outline-none
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            outline-none
            "
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-white
            text-black
            "
          >
            <option value="user">Normal User</option>

            <option value="company">Entertainment Company</option>
          </select>

          {formData.role === "company" && (
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-white/10
                text-white
                placeholder-gray-400
                outline-none
                "
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-[#D4A017]
            text-black
            font-bold
            py-3
            rounded-xl
            hover:opacity-90
            transition
            "
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p
          className="
          text-center
          text-gray-300
          mt-6
          "
        >
          Already have an account?
          <Link
            to="/login"
            className="
            text-[#D4A017]
            ml-2
            font-semibold
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
