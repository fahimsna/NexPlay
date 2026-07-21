import { useEffect, useState } from "react";
import EntertainmentCard from "../EntertainmentCard";
import { getTrendingTVShows } from "../services/tmdbService";

function Series() {
  const [shows, setShows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    loadSeries();
  }, []);

  async function loadSeries() {
    try {
      const data = await getTrendingTVShows(1);

      setShows(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMoreSeries() {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getTrendingTVShows(nextPage);

      setShows((previous) => [...previous, ...data]);

      setPage(nextPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <section
        className="
        min-h-screen
        bg-[#17191D]
        text-white
        flex
        items-center
        justify-center
        "
      >
        <h1 className="text-3xl font-bold">Loading Series...</h1>
      </section>
    );
  }

  return (
    <section
      className="
      min-h-screen
      bg-[#17191D]
      text-white
      pt-32
      pb-20
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        sm:px-8
        "
      >
        {/* Header */}

        <div className="text-center">
          <div
            className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            text-[#D4A017]
            text-xs
            uppercase
            tracking-[2px]
            "
          >
            TV Collection
          </div>

          <h1
            className="
            mt-6
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            "
          >
            Explore
            <span className="text-[#D4A017]">Series</span>
          </h1>

          <p
            className="
            mt-4
            text-gray-400
            "
          >
            Discover trending TV shows and popular series.
          </p>
        </div>

        {/* Series Grid */}

        <div
          className="
          grid
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
          mt-14
          "
        >
          {shows.map((show) => (
            <EntertainmentCard key={show.id} movie={show} />
          ))}
        </div>

        {/* Load More */}

        <div
          className="
          flex
          justify-center
          mt-14
          "
        >
          <button
            onClick={loadMoreSeries}
            disabled={loadingMore}
            className="
            px-8
            py-3
            rounded-full
            bg-[#D4A017]
            text-[#17191D]
            font-semibold
            hover:scale-105
            transition
            disabled:opacity-50
            "
          >
            {loadingMore ? "Loading..." : "Load More Series"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Series;
