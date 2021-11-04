export const TMDB_API = "https://api.themoviedb.org/3";
export const TMDB_IMAGE = "https://image.tmdb.org/t/p/";

export const imageResize = (src: string, dimension: string = "w200") => `${TMDB_IMAGE}${dimension}${src}`;
export const imageOriginal = (src: string) => `${TMDB_IMAGE}original${src}`;

export const HomeAPIRoutes: { [key: string]: { url: string; type: "tv" | "movie" } } = {
  "Trending Movies": { url: "/trending/movie/week", type: "movie" },
  "Popular Movies": { url: "/movie/popular", type: "movie" },
  "Top Rated Movies": { url: "/movie/top_rated", type: "movie" },
  "Trending TV": { url: "/trending/tv/week", type: "tv" },
  "Popular TV": { url: "/tv/popular", type: "tv" },
  "Top Rated TV": { url: "/tv/top_rated", type: "tv" },
};

export const MovieDetailRoute = (id: string) => `/movie/${id}`;
