import { useEffect, useState } from "react";
import { createCompany, updateCompany } from "../../services/companyService";

function CompanyForm({ company }) {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    industry: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Load existing company data
  useEffect(() => {
    if (company) {
      setFormData({
        companyName: company.companyName || "",
        website: company.website || "",
        industry: company.industry || "",
        description: company.description || "",
      });
    }
  }, [company]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Create / Update company
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (company) {
        await updateCompany(company._id, formData);

        alert("Company updated successfully!");
      } else {
        await createCompany(formData);

        alert("Company created successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = `
    w-full
    bg-[#22252B]
    text-white
    border
    border-white/10
    rounded-xl
    px-4
    py-3
    outline-none
    placeholder:text-gray-500
    focus:border-[#D4A017]
    transition
  `;

  return (
    <div
      className="
        bg-[#2A2D34]
        border
        border-white/10
        rounded-3xl
        p-6
        lg:p-8
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          {company ? "Edit Company Profile" : "Create Company Profile"}
        </h2>

        <p className="mt-2 text-gray-400">Manage your company information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}

        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            autoComplete="off"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Netflix"
            required
            className={inputStyle}
          />
        </div>

        {/* Website + Industry */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          {/* Website */}

          <div>
            <label className="block mb-2 text-sm text-gray-300">Website</label>

            <input
              type="url"
              name="website"
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className={inputStyle}
            />
          </div>

          {/* Industry */}

          <div>
            <label className="block mb-2 text-sm text-gray-300">Industry</label>

            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">Select Industry</option>

              <option value="Streaming">Streaming</option>

              <option value="Movie Studio">Movie Studio</option>

              <option value="TV Network">TV Network</option>

              <option value="Gaming">Gaming</option>

              <option value="Sports">Sports</option>

              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        {/* Description */}

        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell users about your company..."
            className={inputStyle}
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-[#D4A017]
            text-black
            rounded-xl
            py-3
            font-semibold
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : company
              ? "Update Profile"
              : "Create Profile"}
        </button>
      </form>
    </div>
  );
}

export default CompanyForm;
