import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./AdvertisementManagement.css";

const STORAGE_KEY = "nexplayAdvertisements";

function getSavedAdvertisements() {
  try {
    const savedAdvertisements = localStorage.getItem(STORAGE_KEY);

    if (savedAdvertisements) {
      return JSON.parse(savedAdvertisements);
    }
  } catch (error) {
    console.error("Could not read saved advertisements:", error);
  }

  return [];
}

function AdvertisementManagement() {
  const [ads, setAds] = useState(getSavedAdvertisements);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
  }, [ads]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const saveAdvertisement = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      setAds((previousAds) =>
        previousAds.map((ad) =>
          ad.id === editingId
            ? {
                ...ad,
                ...formData,
              }
            : ad
        )
      );
    } else {
      const newAdvertisement = {
        id: Date.now(),
        ...formData,
      };

      setAds((previousAds) => [...previousAds, newAdvertisement]);
    }

    resetForm();
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this advertisement?"
    );

    if (!confirmed) {
      return;
    }

    setAds((previousAds) =>
      previousAds.filter((ad) => ad.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  };

  const changeAdvertisementStatus = (id, newStatus) => {
    setAds((previousAds) =>
      previousAds.map((ad) =>
        ad.id === id
          ? {
              ...ad,
              status: newStatus,
            }
          : ad
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="advertisement-page">
        <h1>Advertisement Management</h1>

        <button
          type="button"
          className="create-ad-button"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              openCreateForm();
            }
          }}
        >
          {showForm ? "Close Form" : "Create New Advertisement"}
        </button>

        {showForm && (
          <form
            className="advertisement-form"
            onSubmit={saveAdvertisement}
          >
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
              <option value="Paused">Paused</option>
              <option value="Inactive">Inactive</option>
              <option value="Ended">Ended</option>
            </select>

            <button type="submit" className="save-ad-button">
              {editingId !== null
                ? "Update Advertisement"
                : "Save Advertisement"}
            </button>
          </form>
        )}

        <div className="advertisement-list">
          {ads.length === 0 ? (
            <p>No advertisements created yet.</p>
          ) : (
            ads.map((ad) => (
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
                  {ad.status !== "Active" && (
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        changeAdvertisementStatus(ad.id, "Active")
                      }
                    >
                      Start
                    </button>
                  )}

                  {ad.status === "Active" && (
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        changeAdvertisementStatus(ad.id, "Paused")
                      }
                    >
                      Pause
                    </button>
                  )}

                  {ad.status !== "Ended" && (
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        changeAdvertisementStatus(ad.id, "Ended")
                      }
                    >
                      End
                    </button>
                  )}

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
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdvertisementManagement;