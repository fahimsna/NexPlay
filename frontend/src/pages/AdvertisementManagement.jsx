import { useState } from "react";
import "./AdvertisementManagement.css";

function AdvertisementManagement() {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "New Movie Promotion",
      startDate: "2026-07-20",
      endDate: "2026-07-30",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveAdvertisement = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      const updatedAds = ads.map((ad) =>
        ad.id === editingId
          ? {
              ...ad,
              title: formData.title,
              startDate: formData.startDate,
              endDate: formData.endDate,
              status: formData.status,
            }
          : ad
      );

      setAds(updatedAds);
      setEditingId(null);
    } else {
      const newAdvertisement = {
        id: Date.now(),
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
      };

      setAds([...ads, newAdvertisement]);
    }

    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });

    setShowForm(false);
  };

  const editAdvertisement = (ad) => {
    setFormData({
      title: ad.title,
      startDate: ad.startDate,
      endDate: ad.endDate,
      status: ad.status,
    });

    setEditingId(ad.id);
    setShowForm(true);
  };

  const deleteAdvertisement = (id) => {
    const updatedAds = ads.filter((ad) => ad.id !== id);
    setAds(updatedAds);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);

    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });
  };

  return (
    <div className="advertisement-page">
      <h1>Advertisement & Campaign Management</h1>

      <button
        type="button"
        className="create-ad-button"
        onClick={() => {
          if (showForm) {
            closeForm();
          } else {
            setShowForm(true);
          }
        }}
      >
        {showForm ? "Close Form" : "Create New Advertisement"}
      </button>

      {showForm && (
        <form className="advertisement-form" onSubmit={saveAdvertisement}>
          <h2>
            {editingId !== null
              ? "Edit Advertisement"
              : "Create Advertisement"}
          </h2>

          <label htmlFor="title">Advertisement Title</label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter advertisement title"
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

          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" className="save-ad-button">
            {editingId !== null
              ? "Update Advertisement"
              : "Save Advertisement"}
          </button>
        </form>
      )}

      <div className="advertisement-list">
        {ads.map((ad) => (
          <div className="advertisement-card" key={ad.id}>
            <h2>{ad.title}</h2>

            <p>
              <strong>Start Date:</strong> {ad.startDate}
            </p>

            <p>
              <strong>End Date:</strong> {ad.endDate}
            </p>

            <p>
              <strong>Status:</strong> {ad.status}
            </p>

            <div className="action-buttons">
              <button
                type="button"
                className="edit-button"
                onClick={() => editAdvertisement(ad)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteAdvertisement(ad.id)}
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

export default AdvertisementManagement;