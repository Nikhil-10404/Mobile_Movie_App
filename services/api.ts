export const TMDB_CONFIG = {
  BASE_URL: "https://movie-backend-rs8v.onrender.com",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },// Your backend URL
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/movies?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/movies`;

  try {
      const response = await fetch(endpoint, {
          method: "GET",
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movies/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};