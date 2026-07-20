import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getCompanies, updateCompany } from "../services/companyService";

import {
  HiBuildingOffice2,
  HiPencilSquare,
  HiCheck,
  HiXMark,
} from "react-icons/hi2";

const API_URL = "http://localhost:8000";

function CompanyProfile() {
  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [logo, setLogo] = useState(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const imageUrl = (path) => {
    if (!path) return "";

    return `${API_URL}${path}`;
  };

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

        setPreview(imageUrl(companyData.logo));
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

      const updated = response.company;

      setCompany(updated);

      setPreview(imageUrl(updated.logo));

      setLogo(null);

      setEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-400">Loading...</p>
      </DashboardLayout>
    );
  }

  if (!company) {
    return (
      <DashboardLayout>
        <p className="text-gray-400">No company profile found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="
          bg-[#1B1D22]
          rounded-3xl
          p-6
          sm:p-8
          border
          border-white/5
        "
      >
        {/* Top Section */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-6
          "
        >
          {/* Logo + Name */}

          <div
            className="
              flex
              items-center
              gap-6
            "
          >
            {/* Logo */}

            <div
              className="
                flex
                flex-col
                items-center
                gap-3
              "
            >
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
                  <HiBuildingOffice2
                    size={50}
                    className="
                        text-[#17191D]
                      "
                  />
                )}
              </div>

              {editing && (
                <label
                  className="
                      cursor-pointer
                      bg-[#353941]
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                      hover:bg-[#40444D]
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
                  text-3xl
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
            </div>
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
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
              <HiPencilSquare size={20} />
              Edit Profile
            </button>
          )}
        </div>

        {editing && (
          <div
            className="
                mt-10
                space-y-5
              "
          >
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="
                  w-full
                  bg-[#17191D]
                  text-white
                  p-4
                  rounded-xl
                  border
                  border-white/5
                "
            />

            <input
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Industry"
              className="
                  w-full
                  bg-[#17191D]
                  text-white
                  p-4
                  rounded-xl
                  border
                  border-white/5
                "
            />

            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website"
              className="
                  w-full
                  bg-[#17191D]
                  text-white
                  p-4
                  rounded-xl
                  border
                  border-white/5
                "
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Description"
              className="
                  w-full
                  bg-[#17191D]
                  text-white
                  p-4
                  rounded-xl
                  border
                  border-white/5
                "
            />

            <div
              className="
                  flex
                  gap-4
                "
            >
              <button
                onClick={handleUpdate}
                disabled={saving}
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
                <HiCheck />

                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => setEditing(false)}
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
                <HiXMark />
                Cancel
              </button>
            </div>
          </div>
        )}

        {!editing && (
          <div
            className="
              mt-10
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
            <Info title="Website" value={company.website || "Not added"} />

            <Info title="Status" value={company.status} />

            <div className="md:col-span-2">
              <Info
                title="Description"
                value={company.description || "No description"}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{title}</p>

      <p className="text-white mt-2">{value}</p>
    </div>
  );
}

export default CompanyProfile;
