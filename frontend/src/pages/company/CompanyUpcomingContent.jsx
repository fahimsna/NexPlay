import { useEffect, useState } from "react";

import {
  getUpcoming,
  createUpcoming,
  updateUpcoming,
  deleteUpcoming,
} from "../../api/upcomingApi";

const CompanyUpcomingContent = () => {
  const [contents, setContents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    description: "",
    poster: "",
    logo: "",
    trailer: "",
    releaseDate: "",
    status: "Coming Soon",
  };

  const [formData, setFormData] = useState(emptyForm);

  // ==========================
  // LOAD COMPANY CONTENT
  // ==========================

  const loadContents = async () => {
    try {
      setLoading(true);

      const data = await getUpcoming();

      setContents(data);
    } catch (error) {
      console.log("LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // CREATE / UPDATE
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateUpcoming(
          editingId,

          formData,
        );
      } else {
        await createUpcoming(formData);
      }

      setFormData(emptyForm);

      setEditingId(null);

      loadContents();
    } catch (error) {
      console.log("SAVE ERROR:", error);
    }
  };

  // ==========================
  // EDIT
  // ==========================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      title: item.title,

      description: item.description || "",

      poster: item.poster || "",

      logo: item.logo || "",

      trailer: item.trailer || "",

      releaseDate: item.releaseDate.split("T")[0],

      status: item.status,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  // ==========================
  // DELETE
  // ==========================

  const handleDelete = async (id) => {
    try {
      await deleteUpcoming(id);

      loadContents();
    } catch (error) {
      console.log("DELETE ERROR", error);
    }
  };

  if (loading) {
    return (
      <div
        className="
      min-h-screen
      bg-[#17191D]
      flex
      items-center
      justify-center
      text-white
      "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-[#17191D]
text-white
p-4
md:p-8
"
    >
      <div
        className="
max-w-7xl
mx-auto
space-y-8
"
      >
        {/* HEADER */}

        <div>
          <h1
            className="
text-3xl
font-bold
"
          >
            Upcoming Content Management
          </h1>

          <p
            className="
text-gray-400
mt-2
"
          >
            Promote your upcoming movies, shows and events
          </p>
        </div>

        {/* FORM */}

        <div
          className="
bg-[#22252B]
border
border-[#34373D]
rounded-xl
p-6
"
        >
          <h2
            className="
text-xl
font-semibold
mb-5
"
          >
            {editingId ? "Edit Content" : "Add New Content"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="
space-y-4
"
          >
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Content Title"
              required
              className="
input-style
w-full
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              className="
w-full
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
            />

            <input
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              placeholder="Poster Image URL"
              className="
w-full
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
            />

            <input
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Company Logo URL"
              className="
w-full
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
            />

            <input
              name="trailer"
              value={formData.trailer}
              onChange={handleChange}
              placeholder="Trailer YouTube URL"
              className="
w-full
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
            />

            <div
              className="
grid
md:grid-cols-2
gap-4
"
            >
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
                className="
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
bg-[#17191D]
border
border-[#34373D]
rounded-lg
px-4
py-3
text-white
"
              >
                <option>Coming Soon</option>

                <option>Released</option>
              </select>
            </div>

            <button
              className="
bg-[#D4A017]
hover:bg-[#B8860B]
text-black
font-bold
px-6
py-3
rounded-lg
transition
"
            >
              {editingId ? "Update Content" : "Add Content"}
            </button>
          </form>
        </div>

        {/* CONTENT CARDS */}

        <div
          className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {contents.map((item) => (
            <div
              key={item._id}
              className="
bg-[#22252B]
border
border-[#34373D]
rounded-xl
overflow-hidden
shadow-lg
hover:border-[#D4A017]
transition
"
            >
              {/* POSTER */}

              {item.poster && (
                <img
                  src={item.poster}
                  alt={item.title}
                  className="
w-full
h-72
object-cover
"
                />
              )}

              <div
                className="
p-5
"
              >
                <div
                  className="
flex
items-center
gap-3
mb-3
"
                >
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt="logo"
                      className="
w-12
h-12
rounded-full
object-cover
border
border-[#D4A017]
"
                    />
                  )}

                  <h2
                    className="
text-xl
font-bold
"
                  >
                    {item.title}
                  </h2>
                </div>

                <p
                  className="
text-gray-400
text-sm
"
                >
                  {item.description}
                </p>

                <div
                  className="
mt-4
space-y-2
text-sm
text-gray-300
"
                >
                  <p>
                    Release: {new Date(item.releaseDate).toLocaleDateString()}
                  </p>

                  <span
                    className="
inline-block
bg-[#D4A017]
text-black
px-3
py-1
rounded-full
text-xs
font-semibold
"
                  >
                    {item.status}
                  </span>
                </div>

                {item.trailer && (
                  <a
                    href={item.trailer}
                    target="_blank"
                    className="
block
mt-5
text-center
bg-[#D4A017]
hover:bg-[#B8860B]
text-black
font-semibold
py-2
rounded-lg
"
                  >
                    ▶ Watch Trailer
                  </a>
                )}

                <div
                  className="
flex
gap-3
mt-5
"
                >
                  <button
                    onClick={() => handleEdit(item)}
                    className="
flex-1
bg-yellow-500
text-black
py-2
rounded-lg
font-semibold
"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="
flex-1
bg-red-600
hover:bg-red-700
py-2
rounded-lg
font-semibold
"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyUpcomingContent;
