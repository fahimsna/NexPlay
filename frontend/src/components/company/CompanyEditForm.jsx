import { useState } from "react";
import { updateCompany } from "../../services/companyService";
import { HiXMark, HiCheck, HiPhoto } from "react-icons/hi2";

function CompanyEditForm({ company, onCancel, onUpdated }) {
  const [formData, setFormData] = useState({
    companyName: company.companyName || "",

    industry: company.industry || "",

    website: company.website || "",

    description: company.description || "",
  });

  const [logo, setLogo] = useState(null);

  const [preview, setPreview] = useState(company.logo || "");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogo(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("companyName", formData.companyName);

      data.append("industry", formData.industry);

      data.append("website", formData.website);

      data.append("description", formData.description);

      if (logo) {
        data.append("logo", logo);
      }

      const response = await updateCompany(
        company._id,

        data,
      );

      onUpdated(response.company);
    } catch (error) {
      console.error("Company update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-[#17191D]
        border
        border-white/10
        rounded-3xl
        p-6
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
        Edit Company Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}

        <div>
          <label
            className="
            text-gray-400
            text-sm
          "
          >
            Company Logo
          </label>

          <div
            className="
            flex
            items-center
            gap-5
            mt-3
          "
          >
            <div
              className="
              w-24
              h-24
              rounded-2xl
              overflow-hidden
              bg-[#353941]
              flex
              items-center
              justify-center
            "
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Logo preview"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              ) : (
                <HiPhoto size={40} className="text-gray-400" />
              )}
            </div>

            <label
              className="
                cursor-pointer
                bg-[#D4A017]
                text-[#17191D]
                px-5
                py-3
                rounded-xl
                font-semibold
              "
            >
              Choose Logo
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Company Name */}

        <div>
          <label className="text-gray-400 text-sm">Company Name</label>

          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="
              w-full
              mt-2
              bg-[#23262D]
              text-white
              rounded-xl
              px-4
              py-3
              border
              border-white/10
              outline-none
              focus:border-[#D4A017]
            "
          />
        </div>

        {/* Industry */}

        <div>
          <label className="text-gray-400 text-sm">Industry</label>

          <input
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="
              w-full
              mt-2
              bg-[#23262D]
              text-white
              rounded-xl
              px-4
              py-3
              border
              border-white/10
              outline-none
              focus:border-[#D4A017]
            "
          />
        </div>

        {/* Website */}

        <div>
          <label className="text-gray-400 text-sm">Website</label>

          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="
              w-full
              mt-2
              bg-[#23262D]
              text-white
              rounded-xl
              px-4
              py-3
              border
              border-white/10
              outline-none
              focus:border-[#D4A017]
            "
          />
        </div>

        {/* Description */}

        <div>
          <label className="text-gray-400 text-sm">Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="
              w-full
              mt-2
              bg-[#23262D]
              text-white
              rounded-xl
              px-4
              py-3
              border
              border-white/10
              outline-none
              focus:border-[#D4A017]
            "
          />
        </div>

        {/* Buttons */}

        <div
          className="
          flex
          justify-end
          gap-4
        "
        >
          <button
            type="button"
            onClick={onCancel}
            className="
              flex
              items-center
              gap-2
              bg-[#353941]
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            <HiXMark size={20} />
            Cancel
          </button>

          <button
            disabled={loading}
            className="
              flex
              items-center
              gap-2
              bg-[#D4A017]
              text-[#17191D]
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            <HiCheck size={20} />

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyEditForm;
