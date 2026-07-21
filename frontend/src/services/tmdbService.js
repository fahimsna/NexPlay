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

  return data.results;
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

  return data.results;
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

  return data.results;
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

  return data.results;
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

  return data.results;
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
// Search Movies
// =======================

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data = await response.json();

  return data.results;
}
