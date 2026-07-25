import { useEffect, useState } from "react";

import { HiPlus, HiPencilSquare, HiTrash } from "react-icons/hi2";

import toast from "react-hot-toast";

import {
  getMyCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../../services/campaignService";

function CampaignManagement() {
  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",

    description: "",

    startDate: "",

    endDate: "",

    budget: "",

    targetAudience: "All Users",

    status: "Draft",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const data = await getMyCampaigns();

      setCampaigns(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load campaigns");
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

  const resetForm = () => {
    setFormData({
      name: "",

      description: "",

      startDate: "",

      endDate: "",

      budget: "",

      targetAudience: "All Users",

      status: "Draft",
    });

    setEditingId(null);

    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingId) {
        await updateCampaign(editingId, formData);

        toast.success("Campaign updated");
      } else {
        await createCampaign(formData);

        toast.success("Campaign created");
      }

      resetForm();

      fetchCampaigns();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const editCampaign = (campaign) => {
    setFormData({
      name: campaign.name,

      description: campaign.description,

      startDate: campaign.startDate?.slice(0, 10),

      endDate: campaign.endDate?.slice(0, 10),

      budget: campaign.budget,

      targetAudience: campaign.targetAudience,

      status: campaign.status,
    });

    setEditingId(campaign._id);

    setShowForm(true);
  };

  const removeCampaign = async (id) => {
    try {
      await deleteCampaign(id);

      toast.success("Campaign deleted");

      fetchCampaigns();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div
        className="
text-center
text-white
py-20
"
      >
        Loading campaigns...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* HEADER */}

      <div
        className="
flex
flex-col
sm:flex-row
sm:justify-between
sm:items-center
gap-5
mb-8
"
      >
        <div>
          <h1
            className="
text-2xl
sm:text-3xl
font-bold
text-white
"
          >
            Campaign Management
          </h1>

          <p
            className="
text-gray-400
mt-2
"
          >
            Create and manage marketing campaigns
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="
bg-[#D4A017]
text-black
px-5
py-3
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
w-full
sm:w-auto
"
        >
          <HiPlus />

          {showForm ? "Close" : "New Campaign"}
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="
bg-[#393E46]
border
border-white/10
rounded-2xl
p-5
sm:p-6
space-y-5
mb-8
"
        >
          <h2
            className="
text-xl
font-bold
text-white
"
          >
            {editingId ? "Edit Campaign" : "Create Campaign"}
          </h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Campaign Name"
            className="
w-full
p-3
rounded-lg
bg-white/10
text-white
outline-none
"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="
w-full
p-3
rounded-lg
bg-white/10
text-white
outline-none
"
          />

          <div
            className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
"
          >
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="
p-3
rounded-lg
bg-white/10
text-white
"
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="
p-3
rounded-lg
bg-white/10
text-white
"
            />
          </div>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
            className="
w-full
p-3
rounded-lg
bg-white/10
text-white
"
          />

          <select
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="
w-full
p-3
rounded-lg
bg-white/10
text-white
"
          >
            <option>All Users</option>

            <option>Movie Fans</option>

            <option>Sports Fans</option>

            <option>Anime Fans</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
w-full
p-3
rounded-lg
bg-white/10
text-white
"
          >
            <option>Draft</option>

            <option>Active</option>

            <option>Paused</option>

            <option>Completed</option>
          </select>

          <div
            className="
flex
flex-col
sm:flex-row
gap-3
"
          >
            <button
              disabled={saving}
              className="
bg-[#D4A017]
text-black
px-6
py-3
rounded-xl
font-bold
w-full
sm:w-auto
"
            >
              {saving ? "Saving..." : "Save Campaign"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="
bg-gray-600
text-white
px-6
py-3
rounded-xl
w-full
sm:w-auto
"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* LIST */}

      {campaigns.length === 0 ? (
        <div
          className="
text-center
text-gray-400
py-20
"
        >
          No campaigns created yet.
        </div>
      ) : (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-5
"
        >
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="
bg-[#393E46]
border
border-white/10
rounded-2xl
p-5
"
            >
              <h2
                className="
text-xl
font-bold
text-white
break-words
"
              >
                {campaign.name}
              </h2>

              <p
                className="
text-gray-300
mt-2
text-sm
"
              >
                {campaign.description}
              </p>

              <div
                className="
mt-4
space-y-2
text-sm
text-gray-300
"
              >
                <p>Start: {campaign.startDate?.slice(0, 10)}</p>

                <p>End: {campaign.endDate?.slice(0, 10)}</p>

                <p>Budget: ৳{campaign.budget}</p>

                <p>Audience: {campaign.targetAudience}</p>

                <p>Status: {campaign.status}</p>
              </div>

              <div
                className="
flex
flex-col
sm:flex-row
gap-3
mt-5
"
              >
                <button
                  onClick={() => editCampaign(campaign)}
                  className="
flex-1
bg-blue-500
text-white
py-2
rounded-xl
flex
justify-center
items-center
gap-2
"
                >
                  <HiPencilSquare />
                  Edit
                </button>

                <button
                  onClick={() => removeCampaign(campaign._id)}
                  className="
flex-1
bg-red-600
text-white
py-2
rounded-xl
flex
justify-center
items-center
gap-2
"
                >
                  <HiTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampaignManagement;
