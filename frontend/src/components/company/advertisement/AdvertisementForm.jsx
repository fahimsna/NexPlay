import { useState } from "react";

function AdvertisementForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",

    description: initialData?.description || "",

    type: initialData?.type || "Banner",

    status: initialData?.status || "Draft",

    startDate: initialData?.startDate ? initialData.startDate.slice(0, 10) : "",

    endDate: initialData?.endDate ? initialData.endDate.slice(0, 10) : "",

    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,

      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div
      className="
bg-[#393E46]
border
border-white/10
rounded-2xl
p-5
sm:p-6
"
    >
      <h2
        className="
text-xl
sm:text-2xl
font-bold
text-white
mb-6
"
      >
        Create Advertisement
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
space-y-5
"
      >
        {/* IMAGE */}

        <div>
          <label
            className="
text-gray-300
text-sm
"
          >
            Banner Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="
block
mt-2
text-sm
text-gray-300
w-full
"
          />
        </div>

        {/* TITLE */}

        <div>
          <label
            className="
text-gray-300
text-sm
"
          >
            Advertisement Title
          </label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="
w-full
mt-2
p-3
rounded-lg
bg-white/10
border
border-white/10
text-white
outline-none
focus:border-[#D4A017]
"
            required
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label
            className="
text-gray-300
text-sm
"
          >
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="
w-full
mt-2
p-3
rounded-lg
bg-white/10
border
border-white/10
text-white
outline-none
focus:border-[#D4A017]
resize-none
"
          />
        </div>

        {/* DATE */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
"
        >
          <div>
            <label
              className="
text-gray-300
text-sm
"
            >
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="
w-full
mt-2
p-3
rounded-lg
bg-white/10
text-white
border
border-white/10
"
              required
            />
          </div>

          <div>
            <label
              className="
text-gray-300
text-sm
"
            >
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="
w-full
mt-2
p-3
rounded-lg
bg-white/10
text-white
border
border-white/10
"
              required
            />
          </div>
        </div>

        {/* TYPE */}

        <div>
          <label
            className="
text-gray-300
text-sm
"
          >
            Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="
w-full
mt-2
p-3
rounded-lg
bg-white/10
text-white
border
border-white/10
"
          >
            <option value="Banner">Banner</option>

            <option value="Poster">Poster</option>

            <option value="Video">Video</option>

            <option value="Social">Social</option>
          </select>
        </div>

        {/* STATUS */}

        <div>
          <label
            className="
text-gray-300
text-sm
"
          >
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
w-full
mt-2
p-3
rounded-lg
bg-white/10
text-white
border
border-white/10
"
          >
            <option value="Draft">Draft</option>

            <option value="Active">Active</option>

            <option value="Paused">Paused</option>

            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* BUTTONS */}

        <div
          className="
flex
flex-col
sm:flex-row
gap-3
pt-3
"
        >
          <button
            disabled={loading}
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
            {loading ? "Saving..." : "Create Advertisement"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="
bg-gray-600
text-white
px-6
py-3
rounded-xl
font-bold
w-full
sm:w-auto
"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdvertisementForm;
