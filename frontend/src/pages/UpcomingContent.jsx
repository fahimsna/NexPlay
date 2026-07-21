import React, { useState } from "react";

function UpcomingContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Movie");
  const [genre, setGenre] = useState("Action");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [status, setStatus] = useState("Coming Soon");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [contentList, setContentList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContent = {
      title,
      description,
      category,
      genre,
      releaseDate,
      imageUrl,
      trailerUrl,
      status,
    };

    if (isEditing) {
      const updated = [...contentList];
      updated[editIndex] = newContent;
      setContentList(updated);

      setIsEditing(false);
      setEditIndex(null);

      alert("Content Updated Successfully!");
    } else {
      setContentList([...contentList, newContent]);
      alert("Content Added Successfully!");
    }

    setTitle("");
    setDescription("");
    setCategory("Movie");
    setGenre("Action");
    setReleaseDate("");
    setImageUrl("");
    setTrailerUrl("");
    setStatus("Coming Soon");
  };

  const handleDelete = (index) => {
    const updated = contentList.filter((_, i) => i !== index);
    setContentList(updated);
  };

  const handleEdit = (index) => {
    const item = contentList[index];

    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setGenre(item.genre);
    setReleaseDate(item.releaseDate);
    setImageUrl(item.imageUrl);
    setTrailerUrl(item.trailerUrl);
    setStatus(item.status);

    setEditIndex(index);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredContent = contentList.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-2">
        Upcoming Content Management
      </h1>

      <p className="text-gray-400 mb-8">
        Manage upcoming movies, TV series, anime, documentaries and sports events.
      </p>

      <div className="bg-[#2d2f39] rounded-xl p-8 shadow-lg">

        <h2 className="text-2xl font-semibold mb-6">
          {isEditing ? "Update Content" : "Add New Content"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Content Title"
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            rows="4"
            placeholder="Description"
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Movie</option>
            <option>TV Series</option>
            <option>Web Series</option>
            <option>Anime</option>
            <option>Documentary</option>
            <option>Sports</option>
          </select>

          <select
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Action</option>
            <option>Adventure</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Thriller</option>
            <option>Sports</option>
          </select>

          <input
            type="date"
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Poster Image URL"
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <input
            type="url"
            placeholder="Trailer URL (YouTube)"
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
          />

          <select
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Coming Soon</option>
            <option>Released</option>
          </select>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg"
          >
            {isEditing ? "Update Content" : "Add Content"}
          </button>

        </form>
              </div>

      {/* Search & Filter */}
      <div className="bg-[#2d2f39] rounded-xl p-6 shadow-lg mt-8 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search by Title..."
          className="flex-1 p-3 rounded-lg bg-[#1f2029] border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded-lg bg-[#1f2029] border border-gray-600"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          <option>Movie</option>
          <option>TV Series</option>
          <option>Web Series</option>
          <option>Anime</option>
          <option>Documentary</option>
          <option>Sports</option>
        </select>

      </div>

      {/* Content List */}

      <div className="bg-[#2d2f39] rounded-xl p-8 shadow-lg mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Upcoming Content List
        </h2>

        {filteredContent.length === 0 ? (

          <p className="text-gray-400">
            No content found.
          </p>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredContent.map((item, index) => (

              <div
                key={index}
                className="bg-[#1f2029] rounded-xl border border-gray-700 overflow-hidden"
              >

                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm">

                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>

                    <p>
                      <strong>Genre:</strong> {item.genre}
                    </p>

                    <p>
                      <strong>Release:</strong> {item.releaseDate}
                    </p>

                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">

                    {item.trailerUrl && (

                      <a
                        href={item.trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                      >
                        ▶ Watch Trailer
                      </a>

                    )}

                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
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

    </div>
  );
}

export default UpcomingContent;