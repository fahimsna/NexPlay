import { useEffect, useState } from "react";

import AdvertisementCard from "../../components/company/advertisement/AdvertisementCard";
import AdvertisementForm from "../../components/company/advertisement/AdvertisementForm";
import AdvertisementStats from "../../components/company/advertisement/AdvertisementStats";
import EmptyState from "../../components/company/advertisement/EmptyState";

import {
  getMyAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} from "../../services/advertisementService";

import { HiPlus } from "react-icons/hi2";

import toast from "react-hot-toast";

const IMAGE_URL = "https://nexplay-6jls.onrender.com/uploads/";

function AdvertisementManagement() {
  const [advertisements, setAdvertisements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingAdvertisement, setEditingAdvertisement] = useState(null);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      setLoading(true);

      const data = await getMyAdvertisements();

      const formatted = data.map((ad) => ({
        ...ad,

        image: ad.image ? IMAGE_URL + ad.image : "",
      }));

      setAdvertisements(formatted);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load advertisements");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setEditingAdvertisement(null);

    setShowForm(true);
  };

  const handleEditClick = (ad) => {
    setEditingAdvertisement(ad);

    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      setSaving(true);

      if (editingAdvertisement) {
        await updateAdvertisement(editingAdvertisement._id, data);

        toast.success("Advertisement updated");
      } else {
        await createAdvertisement(data);

        toast.success("Advertisement created");
      }

      setShowForm(false);

      setEditingAdvertisement(null);

      fetchAdvertisements();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdvertisement(id);

      toast.success("Advertisement deleted");

      fetchAdvertisements();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading advertisements...
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
sm:items-center
sm:justify-between
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
            Advertisement Management
          </h1>

          <p
            className="
text-gray-400
mt-2
text-sm
sm:text-base
"
          >
            Create and manage advertisements
          </p>
        </div>

        <button
          onClick={handleCreateClick}
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
          <HiPlus size={22} />
          New Advertisement
        </button>
      </div>

      {/* STATS */}

      <AdvertisementStats advertisements={advertisements} />

      {/* FORM */}

      {showForm && (
        <div className="mt-8">
          <AdvertisementForm
            initialData={editingAdvertisement}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);

              setEditingAdvertisement(null);
            }}
            loading={saving}
          />
        </div>
      )}

      {/* EMPTY */}

      {!showForm && advertisements.length === 0 && (
        <EmptyState onCreate={handleCreateClick} />
      )}

      {/* CARDS */}

      {advertisements.length > 0 && (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-5
mt-8
"
        >
          {advertisements.map((ad) => (
            <AdvertisementCard
              key={ad._id}
              advertisement={ad}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdvertisementManagement;
