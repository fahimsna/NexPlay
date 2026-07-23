import EntertainmentCard from "../components/entertainment/EntertainmentCard";

function Watchlist() {
  const watchlist = [];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">Your watchlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            <EntertainmentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
