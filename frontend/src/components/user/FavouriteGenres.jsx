import { useState } from "react";
import { HiHeart, HiPencilSquare, HiCheck, HiXMark } from "react-icons/hi2";

const DEFAULT_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Horror",
  "Science Fiction",
  "Thriller",
  "Romance",
];

function FavouriteGenres({ genres = [], onSave }) {
  const [editing, setEditing] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(genres);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre],
    );
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave(selectedGenres);
    }

    setEditing(false);
  };

  const handleCancel = () => {
    setSelectedGenres(genres);
    setEditing(false);
  };

  return (
    <section className="bg-[#1B1D22] border border-white/10 rounded-3xl p-6 sm:p-7">
      {/* Header */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#D4A017]/10 flex items-center justify-center">
            <HiHeart className="text-[#D4A017] text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Favourite Genres</h2>

            <p className="text-sm text-gray-400">
              Choose the genres you enjoy most
            </p>
          </div>
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-white/5
              border
              border-white/10
              text-gray-300
              hover:bg-[#D4A017]
              hover:text-black
              transition
            "
          >
            <HiPencilSquare />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="
                p-2
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-gray-300
                hover:bg-red-500/20
                hover:text-red-400
                transition
              "
            >
              <HiXMark size={20} />
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="
                p-2
                rounded-xl
                bg-[#D4A017]
                text-black
                hover:opacity-90
                transition
              "
            >
              <HiCheck size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Genres */}

      {editing ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {DEFAULT_GENRES.map((genre) => {
            const selected = selectedGenres.includes(genre);

            return (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`
                  px-4
                  py-2
                  rounded-full
                  border
                  text-sm
                  font-medium
                  transition
                  ${
                    selected
                      ? "bg-[#D4A017] border-[#D4A017] text-black"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-[#D4A017] hover:text-[#D4A017]"
                  }
                `}
              >
                {genre}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          {genres.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-[#D4A017]/10
                    border
                    border-[#D4A017]/20
                    text-[#D4A017]
                    text-sm
                    font-medium
                  "
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              You haven't selected any favourite genres yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default FavouriteGenres;
