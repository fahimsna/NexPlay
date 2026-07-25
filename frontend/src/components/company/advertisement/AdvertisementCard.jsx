import { HiCalendarDays, HiPencilSquare, HiTrash } from "react-icons/hi2";

function AdvertisementCard({ advertisement, onEdit, onDelete }) {
  const badgeColor = {
    Active: "bg-green-500/20 text-green-400",

    Paused: "bg-yellow-500/20 text-yellow-400",

    Draft: "bg-gray-500/20 text-gray-300",

    Completed: "bg-purple-500/20 text-purple-400",

    Ended: "bg-red-500/20 text-red-400",
  };

  return (
    <div
      className="
bg-[#393E46]
border
border-white/10
rounded-2xl
overflow-hidden
hover:border-[#D4A017]
transition
w-full
"
    >
      {/* IMAGE */}

      <div
        className="
h-40
sm:h-48
bg-[#222831]
"
      >
        {advertisement.image ? (
          <img
            src={advertisement.image}
            alt={advertisement.title}
            className="
w-full
h-full
object-cover
"
          />
        ) : (
          <div
            className="
w-full
h-full
flex
items-center
justify-center
text-gray-500
text-sm
"
          >
            No Banner
          </div>
        )}
      </div>

      {/* BODY */}

      <div
        className="
p-4
sm:p-5
space-y-4
"
      >
        {/* TITLE + STATUS */}

        <div
          className="
flex
flex-col
sm:flex-row
sm:justify-between
sm:items-start
gap-3
"
        >
          <h2
            className="
text-lg
sm:text-xl
font-bold
text-white
break-words
"
          >
            {advertisement.title}
          </h2>

          <span
            className={`
px-3
py-1
rounded-full
text-xs
font-semibold
w-fit
${badgeColor[advertisement.status] || "bg-gray-700 text-white"}
`}
          >
            {advertisement.status}
          </span>
        </div>

        {/* DESCRIPTION */}

        {advertisement.description && (
          <p
            className="
text-gray-300
text-sm
line-clamp-3
"
          >
            {advertisement.description}
          </p>
        )}

        {/* DATE */}

        <div
          className="
flex
items-start
gap-2
text-gray-400
text-sm
"
        >
          <HiCalendarDays className="mt-1 shrink-0" />

          <span
            className="
break-words
"
          >
            {advertisement.startDate
              ? new Date(advertisement.startDate).toLocaleDateString()
              : ""}

            {" - "}

            {advertisement.endDate
              ? new Date(advertisement.endDate).toLocaleDateString()
              : ""}
          </span>
        </div>

        {/* ACTION BUTTONS */}

        <div
          className="
flex
flex-col
sm:flex-row
gap-3
pt-2
"
        >
          <button
            onClick={() => onEdit(advertisement)}
            className="
flex-1
bg-[#D4A017]
text-black
font-semibold
py-2.5
rounded-xl
flex
items-center
justify-center
gap-2
hover:opacity-90
transition
"
          >
            <HiPencilSquare />
            Edit
          </button>

          <button
            onClick={() => onDelete(advertisement._id)}
            className="
flex-1
bg-red-600
text-white
font-semibold
py-2.5
rounded-xl
flex
items-center
justify-center
gap-2
hover:bg-red-700
transition
"
          >
            <HiTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvertisementCard;
