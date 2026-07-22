import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CompanyDashboardLayout from "../../layouts/CompanyDashboardLayout";
import "./CampaignManagement.css";

const STORAGE_KEY = "nexplayCampaigns";

function getSavedCampaigns() {
  try {
    const savedCampaigns = localStorage.getItem(STORAGE_KEY);

    if (savedCampaigns) {
      const parsedCampaigns = JSON.parse(savedCampaigns);
      return Array.isArray(parsedCampaigns) ? parsedCampaigns : [];
    }
  } catch (error) {
    console.error("Could not read saved campaigns:", error);
  }

  return [];
}

function CampaignManagement() {
  const location = useLocation();

  const isManagementPage = location.pathname === "/company/campaigns";

  const [campaigns, setCampaigns] = useState(getSavedCampaigns);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    audience: "All Users",
    status: "Draft",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));

    window.dispatchEvent(new Event("dashboardDataChanged"));
  }, [campaigns]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      budget: "",
      audience: "All Users",
      status: "Draft",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const saveCampaign = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      setCampaigns((previousCampaigns) =>
        previousCampaigns.map((campaign) =>
          campaign.id === editingId
            ? {
                ...campaign,
                ...formData,
              }
            : campaign,
        ),
      );
    } else {
      const newCampaign = {
        id: Date.now(),
        ...formData,
      };

      setCampaigns((previousCampaigns) => [...previousCampaigns, newCampaign]);
    }

    resetForm();
  };

  const editCampaign = (campaign) => {
    setFormData({
      name: campaign.name,
      description: campaign.description,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      budget: campaign.budget,
      audience: campaign.audience,
      status: campaign.status,
    });

    setEditingId(campaign.id);
    setShowForm(true);
  };

  const deleteCampaign = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?",
    );

    if (!confirmed) {
      return;
    }

    setCampaigns((previousCampaigns) =>
      previousCampaigns.filter((campaign) => campaign.id !== id),
    );

    if (editingId === id) {
      resetForm();
    }
  };

  const changeCampaignStatus = (id, newStatus) => {
    setCampaigns((previousCampaigns) =>
      previousCampaigns.map((campaign) =>
        campaign.id === id
          ? {
              ...campaign,
              status: newStatus,
            }
          : campaign,
      ),
    );
  };

  return (
    <CompanyDashboardLayout>
      <div className="campaign-page">
        <h1>Campaign Management</h1>

        {isManagementPage && (
          <button
            type="button"
            className="create-campaign-button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                openCreateForm();
              }
            }}
          >
            {showForm ? "Close Form" : "Create New Campaign"}
          </button>
        )}

        {showForm && (
          <form className="campaign-form" onSubmit={saveCampaign}>
            <h2>{editingId !== null ? "Edit Campaign" : "Create Campaign"}</h2>

            <label htmlFor="name">Campaign Name</label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter campaign name"
              required
            />

            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter campaign description"
              required
            />

            <label htmlFor="startDate">Start Date</label>

            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="endDate">End Date</label>

            <input
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="budget">Budget</label>

            <input
              id="budget"
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter budget"
              min="0"
              required
            />

            <label htmlFor="audience">Target Audience</label>

            <select
              id="audience"
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
            >
              <option value="All Users">All Users</option>

              <option value="Movie Fans">Movie Fans</option>

              <option value="Anime Fans">Anime Fans</option>

              <option value="Sports Fans">Sports Fans</option>

              <option value="Bangladesh Users">Bangladesh Users</option>
            </select>

            <label htmlFor="status">Status</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Draft">Draft</option>

              <option value="Scheduled">Scheduled</option>

              <option value="Active">Active</option>

              <option value="Paused">Paused</option>

              <option value="Completed">Completed</option>

              <option value="Ended">Ended</option>
            </select>

            <button type="submit" className="save-campaign-button">
              {editingId !== null ? "Update Campaign" : "Save Campaign"}
            </button>
          </form>
        )}

        <div className="campaign-list">
          {campaigns.length === 0 ? (
            <p>No campaigns created yet.</p>
          ) : (
            campaigns.map((campaign) => (
              <div className="campaign-card" key={campaign.id}>
                <h2>{campaign.name}</h2>

                <p>{campaign.description}</p>

                <p>
                  <strong>Start Date:</strong> {campaign.startDate}
                </p>

                <p>
                  <strong>End Date:</strong> {campaign.endDate}
                </p>

                <p>
                  <strong>Budget:</strong> ৳{campaign.budget}
                </p>

                <p>
                  <strong>Target Audience:</strong> {campaign.audience}
                </p>

                <p>
                  <strong>Status:</strong> {campaign.status}
                </p>

                <div className="campaign-action-buttons">
                  {campaign.status !== "Active" && (
                    <button
                      type="button"
                      className="campaign-edit-button"
                      onClick={() =>
                        changeCampaignStatus(campaign.id, "Active")
                      }
                    >
                      Start
                    </button>
                  )}

                  {campaign.status === "Active" && (
                    <button
                      type="button"
                      className="campaign-edit-button"
                      onClick={() =>
                        changeCampaignStatus(campaign.id, "Paused")
                      }
                    >
                      Pause
                    </button>
                  )}

                  {campaign.status !== "Ended" && (
                    <button
                      type="button"
                      className="campaign-delete-button"
                      onClick={() => changeCampaignStatus(campaign.id, "Ended")}
                    >
                      End
                    </button>
                  )}

                  <button
                    type="button"
                    className="campaign-edit-button"
                    onClick={() => editCampaign(campaign)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="campaign-delete-button"
                    onClick={() => deleteCampaign(campaign.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </CompanyDashboardLayout>
  );
}

export default CampaignManagement;
