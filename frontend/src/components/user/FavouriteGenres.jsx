import { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineCheck } from "react-icons/hi2";

const AVAILABLE_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
];

function FavouriteGenres({ favouriteGenres = [], onSave }) {
  const [editing, setEditing] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState(favouriteGenres);

  // Keep local state synchronized with saved profile data
  useEffect(() => {
    setSelectedGenres(Array.isArray(favouriteGenres) ? favouriteGenres : []);
  }, [favouriteGenres]);

  const toggleGenre = (genre) => {
    setSelectedGenres((current) => {
      if (current.includes(genre)) {
        return current.filter((item) => item !== genre);
      }

      return [...current, genre];
    });
  };

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(selectedGenres);
      }

      setEditing(false);
    } catch (error) {
      console.error("Failed to save favourite genres:", error);
    }
  };

  const handleCancel = () => {
    setSelectedGenres(favouriteGenres);
    setEditing(false);
  };

  return (
    <section className="mt-10">
      {/* Header */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Favourite Genres</h2>

          <p className="mt-2 text-sm text-gray-400">
            Choose the genres you enjoy most
          </p>
        </div>

        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/5
              border
              border-white/10
              text-gray-300
              hover:text-[#D4A017]
              hover:border-[#D4A017]
              transition
            "
          >
            <HiOutlinePencil />
            Edit
          </button>
        )}
      </div>

      {/* =========================
          Edit Mode
      ========================= */}

      {editing ? (
        <div
          className="
            mt-6
            bg-[#24272D]
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          <p className="text-sm text-gray-400 mb-5">
            Select the genres you like. You can choose multiple genres.
          </p>

          <div className="flex flex-wrap gap-3">
            {AVAILABLE_GENRES.map((genre) => {
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
                    transition
                    ${
                      selected
                        ? "bg-[#D4A017] border-[#D4A017] text-[#17191D] font-semibold"
                        : "bg-[#17191D] border-white/10 text-gray-300 hover:border-[#D4A017] hover:text-[#D4A017]"
                    }
                  `}
                >
                  {genre}
                </button>
              );
            })}
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-3 mt-7">
            <button
              type="button"
              onClick={handleSave}
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-2.5
                rounded-full
                bg-[#D4A017]
                text-[#17191D]
                font-semibold
                hover:scale-105
                transition
              "
            >
              <HiOutlineCheck />
              Save Genres
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="
                px-6
                py-2.5
                rounded-full
                bg-white/5
                border
                border-white/10
                text-gray-300
                hover:border-white/20
                transition
              "
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* =========================
           Display Mode
        ========================= */

        <div
          className="
            mt-6
            bg-[#24272D]
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          {selectedGenres.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedGenres.map((genre) => (
                <span
                  key={genre}
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-[#17191D]
                    border
                    border-[#D4A017]/30
                    text-[#D4A017]
                    text-sm
                  "
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div
                className="
                  mx-auto
                  w-12
                  h-12
                  rounded-full
                  bg-[#17191D]
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <HiOutlinePencil className="text-gray-500" />
              </div>

              <p className="mt-4 text-gray-400">
                You haven't selected any favourite genres yet.
              </p>

              <button
                type="button"
                onClick={() => setEditing(true)}
                className="
                  mt-4
                  text-sm
                  text-[#D4A017]
                  hover:underline
                "
              >
                Choose your favourite genres
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default FavouriteGenres;
