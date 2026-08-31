import { useEffect, useState } from "react";

import {
  HiBuildingOffice2,
  HiGlobeAlt,
  HiMapPin,
  HiPencilSquare,
  HiCheckBadge,
} from "react-icons/hi2";

import { getMyCompany, updateMyCompany } from "../../services/companyService";

function CompanyProfile() {
  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState(false);

  const [logoFile, setLogoFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    industry: "",
    location: "",
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const data = await getMyCompany();

      setCompany(data);

      setFormData({
        companyName: data.companyName || "",
        description: data.description || "",
        website: data.website || "",
        industry: data.industry || "",
        location: data.location || "",
      });

      if (data.logo) {
        setPreview(`https://nexplay-6jls.onrender.com/uploads/${data.logo}`);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
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

  // LOGO SELECT

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogoFile(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  // UPDATE

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("companyName", formData.companyName);

      data.append("description", formData.description);

      data.append("website", formData.website);

      data.append("industry", formData.industry);

      data.append("location", formData.location);

      if (logoFile) {
        data.append("logo", logoFile);
      }

      const updated = await updateMyCompany(data);

      setCompany(updated);

      setEdit(false);

      alert("Company profile updated");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (loading) {
    return <div className="text-white">Loading Profile...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Company Profile
        </h1>

        <p className="text-gray-400 mt-2">Manage your company information</p>
      </div>

      {/* PROFILE CARD */}

      <div
        className="
bg-[#393E46]
rounded-3xl
p-6
md:p-8
border
border-white/10
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
items-center
gap-5
"
          >
            {/* LOGO */}

            <div>
              <label className="cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    className="
w-20
h-20
rounded-2xl
object-cover
"
                  />
                ) : (
                  <div
                    className="
w-20
h-20
rounded-2xl
bg-[#D4A017]
flex
items-center
justify-center
text-black
"
                  >
                    <HiBuildingOffice2 size={40} />
                  </div>
                )}

                {edit && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogo}
                    className="hidden"
                    id="logo"
                  />
                )}
              </label>

              {edit && (
                <label
                  htmlFor="logo"
                  className="
text-xs
text-[#D4A017]
cursor-pointer
"
                >
                  Change Logo
                </label>
              )}
            </div>

            <div>
              <h2
                className="
text-2xl
font-bold
text-white
flex
items-center
gap-2
"
              >
                {company?.companyName}

                <HiCheckBadge className="text-[#D4A017]" />
              </h2>

              <p className="text-gray-300">{company?.industry}</p>
            </div>
          </div>

          <button
            onClick={() => setEdit(!edit)}
            className="
flex
items-center
gap-2
bg-[#D4A017]
text-black
px-5
py-3
rounded-xl
font-semibold
"
          >
            <HiPencilSquare />

            {edit ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* INFORMATION */}

      <div
        className="
bg-[#393E46]
rounded-3xl
p-6
md:p-8
border
border-white/10
"
      >
        {edit ? (
          <div className="space-y-5">
            {[
              ["companyName", "Company Name"],

              ["industry", "Industry"],

              ["website", "Website"],

              ["location", "Location"],
            ].map(([name, label]) => (
              <input
                key={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="
w-full
bg-[#222831]
text-white
px-4
py-3
rounded-xl
"
              />
            ))}

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="
w-full
h-32
bg-[#222831]
text-white
px-4
py-3
rounded-xl
"
            />

            <button
              onClick={handleUpdate}
              className="
bg-[#D4A017]
text-black
px-6
py-3
rounded-xl
font-bold
"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div
            className="
grid
md:grid-cols-2
gap-6
"
          >
            <Info
              icon={<HiBuildingOffice2 />}
              title="Company"
              value={company?.companyName}
            />

            <Info
              icon={<HiGlobeAlt />}
              title="Website"
              value={company?.website}
            />

            <Info
              icon={<HiMapPin />}
              title="Location"
              value={company?.location}
            />

            <Info
              icon={<HiBuildingOffice2 />}
              title="Industry"
              value={company?.industry}
            />
          </div>
        )}
      </div>

      {/* DESCRIPTION */}

      <div
        className="
bg-[#393E46]
rounded-3xl
p-6
md:p-8
border
border-white/10
"
      >
        <h3
          className="
text-xl
font-bold
text-white
mb-3
"
        >
          About Company
        </h3>

        <p className="text-gray-300 leading-7">
          {company?.description || "No description added yet."}
        </p>
      </div>
    </div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="text-[#D4A017]">{icon}</div>

      <div>
        <p className="text-gray-400 text-sm">{title}</p>

        <p className="text-white font-semibold">{value || "Not Added"}</p>
      </div>
    </div>
  );
}

export default CompanyProfile;
