export const TMDB_API = "https://api.themoviedb.org/3";
export const TMDB_IMAGE = "https://image.tmdb.org/t/p/";

export const imageResize = (src: string, dimension: string = "w200") =>
  `${TMDB_IMAGE}${dimension}${src}`;
export const imageOriginal = (src: string) => `${TMDB_IMAGE}original${src}`;
export const embedMovie = (id: number) => `https://2embed.org/embed/${id}`;
export const embedEpisode = (id: number, season: number, episode: number) =>
  `https://2embed.org/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`;
