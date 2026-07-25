import { useEffect, useState } from "react";

import {
  HiPlus,
  HiTrash,
  HiFilm,
  HiCalendarDays,
  HiPlay,
  HiPhoto,
  HiPencil,
} from "react-icons/hi2";

import {
  createUpcoming,
  getUpcoming,
  updateUpcoming,
  deleteUpcoming,
} from "../../api/upcomingApi";

function CompanyUpcomingContent() {
  const [contents, setContents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Movie",
    genre: "",
    imageUrl: "",
    trailerUrl: "",
    releaseDate: "",
    status: "Coming Soon",
  });

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

        setEditId(null);
      } else {
        await createUpcoming(formData);

        alert("Content added successfully");
      }

      setFormData({
        title: "",
        description: "",
        category: "Movie",
        genre: "",
        imageUrl: "",
        trailerUrl: "",
        releaseDate: "",
        status: "Coming Soon",
      });

      loadContents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      title: item.title,

      description: item.description,

      category: item.category,

      genre: item.genre,

      imageUrl: item.imageUrl,

      trailerUrl: item.trailerUrl,

      releaseDate: item.releaseDate.substring(0, 10),

      status: item.status,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
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

      {/* FORM */}

      <div
        className="
bg-[#393E46]
p-6
rounded-3xl
border
border-white/10
"
      >
        <div
          className="
flex
items-center
gap-3
mb-6
"
        >
          <HiPlus className="text-[#D4A017]" size={30} />

          <h2
            className="
text-xl
font-bold
text-white
"
          >
            {editId ? "Edit Upcoming Content" : "Add Upcoming Content"}
          </h2>
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
            placeholder="Poster Image URL"
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
hover:bg-yellow-400
"
          >
            {editId ? "Update Content" : "Add Content"}
          </button>
        </form>
      </div>

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
mt-2
"
                  >
                    {item.description}
                  </p>

                  <p
                    className="
text-gray-300
mt-4
"
                  >
                    <HiFilm
                      className="
inline
text-[#D4A017]
mr-2
"
                    />

                    {item.category}
                  </p>

                  <p
                    className="
text-gray-300
mt-2
"
                  >
                    <HiCalendarDays
                      className="
inline
text-[#D4A017]
mr-2
"
                    />

                    {item.releaseDate.substring(0, 10)}
                  </p>

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
bg-blue-500
px-4
py-2
rounded-xl
flex
items-center
gap-2
"
                    >
                      <HiPencil />
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
