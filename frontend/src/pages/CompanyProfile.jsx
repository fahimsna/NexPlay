import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  HiBuildingOffice2,
  HiPencilSquare,
  HiCheck,
  HiXMark,
  HiGlobeAlt,
  HiCheckBadge,
} from "react-icons/hi2";

import { getCompanies, updateCompany } from "../services/companyService";

function CompanyProfile() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [logo, setLogo] = useState(null);

  const [preview, setPreview] = useState("");

  const statusStyle = {
    approved: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
    },

    pending: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
    },

    rejected: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
    },
  };

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const data = await getCompanies();

      if (data.length > 0) {
        const companyData = data[0];

        setCompany(companyData);

        setFormData({
          companyName: companyData.companyName || "",

          industry: companyData.industry || "",

          website: companyData.website || "",

          description: companyData.description || "",
        });

        if (companyData.logo) {
          setPreview(`${API_URL}${companyData.logo}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogo(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const form = new FormData();

      form.append("companyName", formData.companyName);

      form.append("industry", formData.industry);

      form.append("website", formData.website);

      form.append("description", formData.description);

      if (logo) {
        form.append("logo", logo);
      }

      const response = await updateCompany(company._id, form);

      setCompany(response.company);

      setPreview(
        response.company.logo ? `${API_URL}${response.company.logo}` : "",
      );

      setLogo(null);

      setEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!company) {
    return <div className="text-white">No company profile found.</div>;
  }

  const currentStatus = statusStyle[company.status] || statusStyle.pending;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}

        <section
          className="
bg-[#1B1D22]
border
border-white/10
rounded-3xl
p-6
sm:p-8
"
        >
          <div
            className="
flex
flex-col
md:flex-row
md:items-center
justify-between
gap-6
"
          >
            <div
              className="
flex
flex-col
sm:flex-row
sm:items-center
gap-5
w-full
"
            >
              <div>
                <div
                  className="
w-28
h-28
rounded-3xl
bg-[#D4A017]
overflow-hidden
flex
items-center
justify-center
"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="logo"
                      className="
w-full
h-full
object-cover
"
                    />
                  ) : (
                    <HiBuildingOffice2 size={50} className="text-[#17191D]" />
                  )}
                </div>

                {editing && (
                  <label
                    className="
block
mt-3
cursor-pointer
text-center
bg-[#24272D]
text-gray-300
px-4
py-2
rounded-xl
text-sm
border
border-white/10
"
                  >
                    Change Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h1
                  className="
          text-2xl
          sm:text-3xl
          font-bold
          text-white
          "
                >
                  {company.companyName}
                </h1>

                <p
                  className="
          text-gray-400
          mt-2
          "
                >
                  {company.industry}
                </p>

                <div
                  className="
          flex
          items-center
          gap-2
          mt-3
          text-sm
          text-gray-300
          "
                >
                  <HiGlobeAlt className="text-[#D4A017]" />

                  {company.website || "No website"}
                </div>

                {/* STATUS */}

                <div
                  className={`
          inline-flex
          items-center
          gap-2
          mt-4
          px-4
          py-2
          rounded-full
          border
          text-sm
          font-semibold
          capitalize

          ${currentStatus.bg}

          ${currentStatus.border}

          ${currentStatus.text}

          `}
                >
                  <HiCheckBadge size={18} />

                  {company.status}
                </div>
              </div>
            </div>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="
        flex
        items-center
        justify-center
        gap-2
        bg-[#D4A017]
        text-[#17191D]
        px-6
        py-3
        rounded-xl
        font-semibold
        "
              >
                <HiPencilSquare />
                Edit Profile
              </button>
            )}
          </div>
        </section>

        {/* EDIT SECTION */}

        {editing && (
          <section
            className="
bg-[#1B1D22]
border
border-white/10
rounded-3xl
p-6
sm:p-8
space-y-5
"
          >
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

            <Input
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />

            <Input
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <div>
              <label
                className="
text-gray-400
text-sm
"
              >
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="
mt-2
w-full
bg-[#24272D]
border
border-white/10
rounded-xl
p-4
text-white
outline-none
resize-none
focus:border-[#D4A017]
"
              />
            </div>

            <div
              className="
flex
flex-col
sm:flex-row
gap-4
"
            >
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="
flex
items-center
justify-center
gap-2
bg-[#D4A017]
text-[#17191D]
px-6
py-3
rounded-xl
font-semibold
"
              >
                <HiCheck />

                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => setEditing(false)}
                className="
flex
items-center
justify-center
gap-2
bg-[#353941]
text-white
px-6
py-3
rounded-xl
"
              >
                <HiXMark />
                Cancel
              </button>
            </div>
          </section>
        )}

        {/* DETAILS */}

        {!editing && (
          <section
            className="
bg-[#1B1D22]
border
border-white/10
rounded-3xl
p-6
sm:p-8
"
          >
            <h2
              className="
text-xl
font-bold
text-white
mb-6
"
            >
              Company Details
            </h2>

            <div
              className="
grid
grid-cols-1
md:grid-cols-2
gap-6
"
            >
              <Info title="Industry" value={company.industry} />

              <Info title="Website" value={company.website || "Not added"} />
            </div>

            <div className="mt-6">
              <Info
                title="Description"
                value={company.description || "No description added"}
              />
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

function Input({
  label,

  name,

  value,

  onChange,
}) {
  return (
    <div>
      <label
        className="
text-gray-400
text-sm
"
      >
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="
mt-2
w-full
bg-[#24272D]
border
border-white/10
rounded-xl
p-4
text-white
outline-none
focus:border-[#D4A017]
"
      />
    </div>
  );
}

function Info({
  title,

  value,
}) {
  return (
    <div>
      <p
        className="
text-gray-400
text-sm
"
      >
        {title}
      </p>

      <p
        className="
text-white
mt-2
wrap-break-words
"
      >
        {value}
      </p>
    </div>
  );
}

export default CompanyProfile;
