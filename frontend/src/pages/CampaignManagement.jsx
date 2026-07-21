import { useState } from "react";
import "./CampaignManagement.css";

function CampaignManagement() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Movie Promotion",
      description: "Promote upcoming summer movie releases.",
      startDate: "2026-08-01",
      endDate: "2026-08-20",
      budget: "50000",
      audience: "Movie Fans",
      status: "Active",
    },
  ]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveCampaign = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      const updatedCampaigns = campaigns.map((campaign) =>
        campaign.id === editingId
          ? {
              ...campaign,
              ...formData,
            }
          : campaign
      );

      setCampaigns(updatedCampaigns);
      setEditingId(null);
    } else {
      const newCampaign = {
        id: Date.now(),
        ...formData,
      };

      setCampaigns([...campaigns, newCampaign]);
    }

    clearForm();
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
    const updatedCampaigns = campaigns.filter(
      (campaign) => campaign.id !== id
    );

    setCampaigns(updatedCampaigns);
  };

  const clearForm = () => {
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

  return (
    <div className="campaign-page">
      <h1>Campaign Management</h1>

      <button
        type="button"
        className="create-campaign-button"
        onClick={() => {
          if (showForm) {
            clearForm();
          } else {
            setShowForm(true);
          }
        }}
      >
        {showForm ? "Close Form" : "Create New Campaign"}
      </button>

      {showForm && (
        <form className="campaign-form" onSubmit={saveCampaign}>
          <h2>
            {editingId !== null ? "Edit Campaign" : "Create Campaign"}
          </h2>

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
          </select>

          <button type="submit" className="save-campaign-button">
            {editingId !== null ? "Update Campaign" : "Save Campaign"}
          </button>
        </form>
      )}

      <div className="campaign-list">
        {campaigns.map((campaign) => (
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
        ))}
      </div>
    </div>
  );
}

export default CampaignManagement;