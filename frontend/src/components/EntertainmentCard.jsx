function EntertainmentCard({ title, category, rating, image }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">

        <h2 className="text-white text-xl font-semibold">
          {title}
        </h2>

        <p className="text-gray-400 mt-2">
          {category}
        </p>

        <p className="text-yellow-400 mt-2">
          ⭐ {rating}
        </p>

        <button className="mt-4 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition">
          View Details
        </button>

      </div>

    </div>
  );
}

export default EntertainmentCard;