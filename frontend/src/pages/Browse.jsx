import { useEffect, useState } from "react";

import EntertainmentCard from "../components/entertainment/EntertainmentCard";



import {
  getTrendingMovies,
  getTrendingTVShows,
  searchMovies,
  getMoviesByGenre,
} from "../services/tmdbService";

const genres = [
  { id: 0, name: "All" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Animation" },
];

function Browse() {
  const [content, setContent] = useState([]);

  const [contentType, setContentType] = useState("movie");

  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedGenre, setSelectedGenre] = useState(0);

  const [page, setPage] = useState(1);

  useEffect(() => {
    loadContent();
  }, [contentType]);

  async function loadContent() {
    try {
      setLoading(true);

      setPage(1);

      let data;

      if (contentType === "movie") {
        data = await getTrendingMovies(1);
      } else {
        data = await getTrendingTVShows(1);
      }

      setContent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      let data;

      if (contentType === "movie") {
        data = await getTrendingMovies(nextPage);
      } else {
        data = await getTrendingTVShows(nextPage);
      }

      setContent((previous) => [...previous, ...data]);

      setPage(nextPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleSearch(e) {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      loadContent();

      return;
    }

    try {
      setLoading(true);

      const data = await searchMovies(value);

      setContent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenre(id) {
    setSelectedGenre(id);

    setSearch("");

    if (id === 0) {
      loadContent();

      return;
    }

    try {
      setLoading(true);

      const data = await getMoviesByGenre(id);

      setContent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* NAVBAR */}

      

      <section className="px-5 sm:px-8 lg:px-12 py-10">
        {/* HEADER */}

        <div className="text-center max-w-3xl mx-auto">
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
            Discover
          </div>

          <h1
            className="
mt-6
text-4xl
sm:text-5xl
lg:text-6xl
font-black
leading-tight
"
          >
            <span className="block">Explore</span>

            <span className="block text-[#D4A017] mt-1">Entertainment</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Browse movies and series from around the world.
          </p>
        </div>

        {/* MOVIE / SERIES TAB */}

        <div className="flex justify-center mt-10">
          <div
            className="
flex
bg-[#24272D]
rounded-full
p-1
w-full
max-w-xs
"
          >
            <button
              onClick={() => setContentType("movie")}
              className={`
flex-1
px-5
py-3
rounded-full
text-sm
transition

${contentType === "movie" ? "bg-[#D4A017] text-[#17191D]" : "text-gray-300"}

`}
            >
              Movies
            </button>

            <button
              onClick={() => setContentType("tv")}
              className={`
flex-1
px-5
py-3
rounded-full
text-sm
transition

${contentType === "tv" ? "bg-[#D4A017] text-[#17191D]" : "text-gray-300"}

`}
            >
              Series
            </button>
          </div>
        </div>

        {/* SEARCH */}

        <div className="max-w-xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={handleSearch}
            className="
w-full
px-5
py-4
rounded-2xl
bg-[#24272D]
border
border-white/10
outline-none
focus:border-[#D4A017]
"
          />
        </div>

        {/* GENRES */}

        {contentType === "movie" && (
          <div
            className="
flex
flex-wrap
justify-center
gap-3
mt-8
"
          >
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenre(genre.id)}
                className={`

px-4

py-2

rounded-full

text-sm


${
  selectedGenre === genre.id
    ? "bg-[#D4A017] text-[#17191D]"
    : "bg-[#24272D] text-gray-300"
}

`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center mt-20 text-2xl">Loading...</div>
        ) : (
          <>
            <div
              className="
grid
grid-cols--1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-8
mt-14
"
            >
              {content.map((item) => (
                <EntertainmentCard key={item.id} movie={item} />
              ))}
            </div>

            <div className="flex justify-center mt-14">
              <button
                onClick={loadMore}
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
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Browse;
