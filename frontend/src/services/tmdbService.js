const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

// =======================
// Trending Movies
// =======================

export async function getTrendingMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Trending TV Shows
// =======================

export async function getTrendingTVShows(page = 1) {
  const response = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending TV shows");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Popular Movies
// =======================

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Popular TV Shows
// =======================

export async function getPopularTVShows() {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TV shows");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Movies By Genre
// =======================

export async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Movie Details
// =======================

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return await response.json();
}

// =======================
// Movie Watch Providers
// =======================
//
// Returns watch-provider information
// for ALL available regions.
//
// Example:
//
// {
//   BD: {
//     link: "...",
//     flatrate: [...],
//     rent: [...],
//     buy: [...]
//   },
//   US: {
//     link: "...",
//     flatrate: [...],
//     rent: [...],
//     buy: [...]
//   }
// }

export async function getMovieWatchProviders(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie watch providers");
  }

  const data = await response.json();

  return data.results || {};
}

// =======================
// TV Watch Providers
// =======================
//
// Returns watch-provider information
// for ALL available regions
// for a TV series.

export async function getTVWatchProviders(id) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TV watch providers");
  }

  const data = await response.json();

  return data.results || {};
}

// =======================
// Search Movies
// =======================

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Genre List
// =======================
// Supports both:
// movie
// tv

export async function getGenreList(type = "movie") {
  const response = await fetch(
    `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genre list");
  }

  const data = await response.json();

  return data.genres || [];
}

// =======================
// Advanced Discover
// =======================
//
// Supports:
//
// - Multiple genres
// - Release year
// - Before year
// - Minimum rating
// - Original language
// - Sorting
// - Pagination
//
// type:
// movie
// tv

export async function discoverContent({
  type = "movie",
  genreIds = [],
  year,
  minRating,
  language,
  sortBy = "popularity.desc",
  page = 1,
} = {}) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: sortBy,
    page: String(page),
    "vote_count.gte": "20",
  });

  const dateField = type === "movie" ? "primary_release" : "first_air_date";

  // Genres

  if (genreIds.length > 0) {
    params.set("with_genres", genreIds.join(","));
  }

  // Year

  if (year) {
    const beforeMatch = /^Before (\d{4})$/.exec(year);

    if (beforeMatch) {
      params.set(`${dateField}.lte`, `${beforeMatch[1]}-01-01`);
    } else if (type === "movie") {
      params.set("primary_release_year", String(year));
    } else {
      params.set("first_air_date_year", String(year));
    }
  }

  // Minimum Rating

  if (minRating) {
    params.set("vote_average.gte", String(minRating));
  }

  // Original Language

  if (language) {
    params.set("with_original_language", language);
  }

  // Request

  const response = await fetch(
    `${BASE_URL}/discover/${type}?${params.toString()}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch filtered content");
  }

  const data = await response.json();

  return data.results || [];
}

// =======================
// Sort Options
// =======================

export const SORT_OPTIONS = [
  {
    value: "popularity.desc",
    label: "Most Popular",
  },
  {
    value: "vote_average.desc",
    label: "Highest Rated",
  },
  {
    value: "primary_release_date.desc",
    label: "Newest First",
  },
  {
    value: "primary_release_date.asc",
    label: "Oldest First",
  },
  {
    value: "original_title.asc",
    label: "A–Z",
  },
];
