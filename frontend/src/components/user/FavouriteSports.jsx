import { useState } from "react";
import { HiTrophy, HiPencilSquare, HiCheck, HiXMark } from "react-icons/hi2";

const DEFAULT_SPORTS = [
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Baseball",
  "Formula 1",
  "Golf",
  "Boxing",
  "MMA",
  "Volleyball",
];

function FavouriteSports({ sports = [], onSave }) {
  const [editing, setEditing] = useState(false);
  const [selectedSports, setSelectedSports] = useState(sports);

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((item) => item !== sport)
        : [...prev, sport],
    );
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave(selectedSports);
    }

    setEditing(false);
  };

  const handleCancel = () => {
    setSelectedSports(sports);
    setEditing(false);
  };

  return (
    <section className="bg-[#1B1D22] border border-white/10 rounded-3xl p-6 sm:p-7">
      {/* Header */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#D4A017]/10 flex items-center justify-center">
            <HiTrophy className="text-[#D4A017] text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Favourite Sports</h2>

            <p className="text-sm text-gray-400">
              Select the sports you follow
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

      {/* Sports */}

      {editing ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {DEFAULT_SPORTS.map((sport) => {
            const selected = selectedSports.includes(sport);

            return (
              <button
                key={sport}
                type="button"
                onClick={() => toggleSport(sport)}
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
                {sport}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          {sports.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {sports.map((sport) => (
                <span
                  key={sport}
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
                  {sport}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              You haven't selected any favourite sports yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default FavouriteSports;
