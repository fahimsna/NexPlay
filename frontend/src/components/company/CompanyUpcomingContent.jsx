import { useEffect, useState } from "react";

import {
  HiPlus,
  HiTrash,
  HiPencilSquare,
  HiFilm,
  HiCalendarDays,
  HiPlay,
  HiPhoto,
  HiXMark,
} from "react-icons/hi2";

import {
  createUpcoming,
  getUpcoming,
  deleteUpcoming,
  updateUpcoming,
} from "../../api/upcomingApi";

function CompanyUpcomingContent() {
  const emptyForm = {
    title: "",
    description: "",
    category: "Movie",
    genre: "",
    imageUrl: "",
    trailerUrl: "",
    releaseDate: "",
    status: "Coming Soon",
  };

  const [contents, setContents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState(emptyForm);

  const [editId, setEditId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      const data = await getUpcoming();

      setContents(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateUpcoming(editId, formData);

        alert("Content updated successfully");
      } else {
        await createUpcoming(formData);

        alert("Content added successfully");
      }

      setFormData(emptyForm);

      setEditId(null);

      setShowForm(false);

      loadContents();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,

      description: item.description,

      category: item.category,

      genre: item.genre,

      imageUrl: item.imageUrl,

      trailerUrl: item.trailerUrl,

      releaseDate: item.releaseDate?.slice(0, 10),

      status: item.status,
    });

    setEditId(item._id);

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this content?");

    if (!confirmDelete) return;

    try {
      await deleteUpcoming(id);

      loadContents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1
            className="
text-3xl
font-bold
text-white
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
            Manage movies, shows, games and sports releases
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);

            setEditId(null);

            setFormData(emptyForm);
          }}
          className="
bg-[#D4A017]
text-black
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"
        >
          <HiPlus />
          Add Content
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div
          className="
bg-[#393E46]
rounded-3xl
p-6
border
border-white/10
"
        >
          <div
            className="
flex
justify-between
items-center
mb-6
"
          >
            <h2
              className="
text-xl
font-bold
text-white
"
            >
              {editId ? "Edit Upcoming Content" : "Add Upcoming Content"}
            </h2>

            <button
              onClick={() => setShowForm(false)}
              className="
text-white
"
            >
              <HiXMark size={25} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
          >
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            />

            <input
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              className="
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            >
              <option>Movie</option>

              <option>TV Show</option>

              <option>Series</option>

              <option>Sports</option>

              <option>Game</option>
            </select>

            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              className="
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            />

            <input
              name="imageUrl"
              placeholder="Poster URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            />

            <input
              name="trailerUrl"
              placeholder="Trailer URL"
              value={formData.trailerUrl}
              onChange={handleChange}
              className="
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="
md:col-span-2
h-32
p-3
rounded-xl
bg-[#222831]
text-white
border
border-white/10
"
            />

            <button
              className="
md:col-span-2
bg-[#D4A017]
text-black
font-bold
py-3
rounded-xl
"
            >
              {editId ? "Update Content" : "Add Content"}
            </button>
          </form>
        </div>
      )}

      {/* LIST */}

      <div>
        <h2
          className="
text-2xl
font-bold
text-white
mb-5
"
        >
          Your Releases
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : contents.length === 0 ? (
          <p className="text-gray-400">No content found</p>
        ) : (
          <div
            className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
          >
            {contents.map((item) => (
              <div
                key={item._id}
                className="
bg-[#393E46]
rounded-3xl
overflow-hidden
border
border-white/10
"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="
w-full
h-56
object-cover
"
                  />
                ) : (
                  <div
                    className="
h-56
flex
items-center
justify-center
bg-[#222831]
text-gray-400
"
                  >
                    <HiPhoto size={40} />
                  </div>
                )}

                <div className="p-5">
                  <h3
                    className="
text-xl
font-bold
text-white
"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
text-gray-400
text-sm
mt-2
"
                  >
                    {item.description}
                  </p>

                  <div
                    className="
mt-4
text-gray-300
space-y-2
text-sm
"
                  >
                    <p>
                      <HiFilm className="inline text-[#D4A017] mr-2" />

                      {item.category}
                    </p>

                    <p>
                      <HiCalendarDays className="inline text-[#D4A017] mr-2" />

                      {new Date(item.releaseDate).toDateString()}
                    </p>
                  </div>

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
bg-blue-600
px-4
py-2
rounded-xl
flex
items-center
gap-2
"
                    >
                      <HiPencilSquare />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="
bg-red-500
px-4
py-2
rounded-xl
flex
items-center
gap-2
"
                    >
                      <HiTrash />
                      Delete
                    </button>

                    {item.trailerUrl && (
                      <a
                        href={item.trailerUrl}
                        target="_blank"
                        className="
bg-green-600
px-4
py-2
rounded-xl
flex
items-center
gap-2
"
                      >
                        <HiPlay />
                        Trailer
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyUpcomingContent;
