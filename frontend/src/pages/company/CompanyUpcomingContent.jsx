import { useEffect, useState } from "react";

import {
  getUpcomingContent,
  addUpcomingContent,
  updateUpcomingContent,
  deleteUpcomingContent,
} from "../../api/upcomingApi";

function CompanyUpcomingContent() {
  const [contents, setContents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [editing, setEditing] = useState(false);

  const [editId, setEditId] = useState(null);

  const initialForm = {
    title: "",
    description: "",
    category: "Movie",
    genre: "Action",
    imageUrl: "",
    trailerUrl: "",
    releaseDate: "",
    status: "Coming Soon",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);

      const res = await getUpcomingContent();

      setContents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateUpcomingContent(editId, form);
      } else {
        await addUpcomingContent(form);
      }

      setForm(initialForm);

      setEditing(false);

      setEditId(null);

      fetchContent();
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (item) => {
    setForm({
      title: item.title,

      description: item.description,

      category: item.category,

      genre: item.genre,

      imageUrl: item.imageUrl || "",

      trailerUrl: item.trailerUrl || "",

      releaseDate: item.releaseDate?.split("T")[0] || "",

      status: item.status,
    });

    setEditId(item._id);

    setEditing(true);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Delete this content?");

    if (!confirmDelete) return;

    try {
      await deleteUpcomingContent(id);

      fetchContent();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = contents.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || item.category === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1
          className="
text-3xl
sm:text-4xl
font-bold
text-white
"
        >
          Upcoming Content
        </h1>

        <p
          className="
text-gray-400
mt-2
text-sm
sm:text-base
"
        >
          Manage your upcoming movies, series and events.
        </p>
      </div>

      {/* FORM */}

      <div
        className="
bg-[#393E46]
border
border-white/10
rounded-3xl
p-5
sm:p-8
"
      >
        <h2
          className="
text-xl
sm:text-2xl
font-semibold
text-white
mb-6
"
        >
          {editing ? "Update Content" : "Add New Content"}
        </h2>

        <form
          onSubmit={submitHandler}
          className="
space-y-5
"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="
w-full
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
outline-none
focus:border-[#D4A017]
"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="
w-full
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
outline-none
focus:border-[#D4A017]
"
          />

          <div
            className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
          >
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
"
            >
              <option>Movie</option>

              <option>TV Series</option>

              <option>Anime</option>

              <option>Documentary</option>

              <option>Sports</option>
            </select>

            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
"
            >
              <option>Action</option>

              <option>Adventure</option>

              <option>Comedy</option>

              <option>Drama</option>

              <option>Horror</option>

              <option>Sci-Fi</option>

              <option>Sports</option>
            </select>
          </div>

          <input
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
            className="
w-full
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
"
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Poster Image URL"
            className="
w-full
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
"
          />

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="preview"
              className="
w-32
h-40
object-cover
rounded-xl
"
            />
          )}

          <input
            name="trailerUrl"
            value={form.trailerUrl}
            onChange={handleChange}
            placeholder="Trailer URL"
            className="
w-full
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
w-full
bg-[#222831]
border
border-white/10
rounded-xl
px-4
py-3
text-white
"
          >
            <option>Coming Soon</option>

            <option>Released</option>
          </select>

          <div
            className="
flex
flex-col
sm:flex-row
gap-4
"
          >
            <button
              className="
bg-[#D4A017]
text-black
font-semibold
px-6
py-3
rounded-xl
hover:scale-105
transition
"
            >
              {editing ? "Update Content" : "Add Content"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(false);

                  setForm(initialForm);
                }}
                className="
bg-gray-600
text-white
px-6
py-3
rounded-xl
"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* SEARCH */}

      <div
        className="
bg-[#393E46]
rounded-3xl
p-5
grid
grid-cols-1
md:grid-cols-2
gap-4
"
      >
        <input
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
bg-[#222831]
rounded-xl
px-4
py-3
text-white
border
border-white/10
"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
bg-[#222831]
rounded-xl
px-4
py-3
text-white
"
        >
          <option>All</option>

          <option>Movie</option>

          <option>TV Series</option>

          <option>Anime</option>

          <option>Sports</option>
        </select>
      </div>

      {/* CONTENT CARDS */}

      {loading ? (
        <h2 className="text-white">Loading...</h2>
      ) : (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {filtered.map((item) => (
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
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="
w-full
h-56
object-cover
"
                />
              )}

              <div
                className="
p-5
"
              >
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
mt-3
text-sm
line-clamp-3
"
                >
                  {item.description}
                </p>

                <div
                  className="
mt-4
text-sm
text-gray-300
space-y-2
"
                >
                  <p>
                    Category:
                    {item.category}
                  </p>

                  <p>
                    Genre:
                    {item.genre}
                  </p>

                  <p>
                    Status:
                    {item.status}
                  </p>
                </div>

                <div
                  className="
flex
flex-wrap
gap-3
mt-5
"
                >
                  <button
                    onClick={() => editHandler(item)}
                    className="
bg-blue-500
px-4
py-2
rounded-xl
text-white
"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHandler(item._id)}
                    className="
bg-red-500
px-4
py-2
rounded-xl
text-white
"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyUpcomingContent;
