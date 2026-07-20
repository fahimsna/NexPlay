import React, { useState } from "react";

function UpcomingContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Movie");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Coming Soon");

  const [contentList, setContentList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContent = {
      title,
      description,
      category,
      releaseDate,
      imageUrl,
      status,
    };

    if (isEditing) {
      const updatedList = [...contentList];
      updatedList[editIndex] = newContent;

      setContentList(updatedList);
      setIsEditing(false);
      setEditIndex(null);

      alert("Content updated successfully!");
    } else {
      setContentList([...contentList, newContent]);
      alert("Content added successfully!");
    }

    setTitle("");
    setDescription("");
    setCategory("Movie");
    setReleaseDate("");
    setImageUrl("");
    setStatus("Coming Soon");
  };

  const handleDelete = (index) => {
    const updatedList = contentList.filter((_, i) => i !== index);
    setContentList(updatedList);
  };

  const handleEdit = (index) => {
    const item = contentList[index];

    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setReleaseDate(item.releaseDate);
    setImageUrl(item.imageUrl);
    setStatus(item.status);

    setEditIndex(index);
    setIsEditing(true);
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-2">
        Upcoming Content
      </h1>

      <p className="text-gray-400 mb-8">
        Manage upcoming movies, series and sports events.
      </p>

      <div className="bg-[#2d2f39] rounded-xl p-8 shadow-lg">

        <h2 className="text-2xl font-semibold mb-6">
          Add New Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
                      <input
            type="text"
            placeholder="Title"
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
            <option>Series</option>
            <option>Sports</option>
            <option>Live Event</option>
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
            placeholder="Image URL"
            className="w-full p-3 rounded-lg bg-[#1f2029] border border-gray-600"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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

      <div className="bg-[#2d2f39] rounded-xl p-8 shadow-lg mt-10">

        <h2 className="text-2xl font-semibold mb-5">
          Upcoming Content List
        </h2>

        {contentList.length === 0 ? (
          <p className="text-gray-400">
            No content yet.
          </p>
        ) : (
          <div className="space-y-4">

            {contentList.map((item, index) => (

              <div
                key={index}
                className="bg-[#1f2029] p-4 rounded-lg border border-gray-700"
              >

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2">
                  {item.description}
                </p>

                <p className="mt-2">
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Release Date:</strong> {item.releaseDate}
                </p>

                <p>
                  <strong>Status:</strong> {item.status}
                </p>

                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="mt-4 w-40 rounded-lg"
                  />
                )}

                <div className="mt-5 flex gap-3">

                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

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


        