import { useEffect, useState } from "react";
import EntertainmentCard from "../components/entertainment/EntertainmentCard";
import { getTrendingMovies } from "../services/tmdbService";

function Movies() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      const data = await getTrendingMovies(1);

      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMoreMovies() {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getTrendingMovies(nextPage);

      setMovies((previous) => [...previous, ...data]);

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
        <h1 className="text-3xl font-bold">Loading Movies...</h1>
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
            Movie Collection
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
            <span className="text-[#D4A017]">Movies</span>
          </h1>

          <p
            className="
            mt-4
            text-gray-400
            "
          >
            Discover trending movies and popular entertainment.
          </p>
        </div>

        {/* Movies Grid */}

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
          {movies.map((movie) => (
            <EntertainmentCard key={movie.id} movie={movie} />
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
            onClick={loadMoreMovies}
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
            {loadingMore ? "Loading..." : "Load More Movies"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Movies;
