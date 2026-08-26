import { HiPencil, HiTrash } from "react-icons/hi2";

export default function ContentCard({ content, onDelete }) {
  return (
    <div
      className="
bg-white
rounded-xl
shadow-md
overflow-hidden
hover:shadow-xl
transition
"
    >
      <img
        src={content.imageUrl || "https://via.placeholder.com/300x400"}
        className="
w-full
h-64
object-cover
"
      />

      <div className="p-5">
        <h2
          className="
text-xl
font-bold
text-gray-800
"
        >
          {content.title}
        </h2>

        <p
          className="
text-gray-500
mt-2
line-clamp-2
"
        >
          {content.description}
        </p>

        <div
          className="
flex
justify-between
items-center
mt-4
"
        >
          <span
            className="
bg-cyan-100
text-cyan-700
px-3
py-1
rounded-full
text-sm
"
          >
            {content.status}
          </span>

          <span
            className="
text-sm
text-gray-500
"
          >
            {content.releaseDate}
          </span>
        </div>

        <div
          className="
flex
gap-3
mt-5
"
        >
          <button
            className="
flex-1
bg-gray-900
text-white
py-2
rounded-lg
hover:bg-gray-700
"
          >
            <HiPencil className="inline" />
            Edit
          </button>

          <button
            onClick={() => onDelete(content._id)}
            className="
flex-1
bg-red-500
text-white
py-2
rounded-lg
hover:bg-red-600
"
          >
            <HiTrash className="inline" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
