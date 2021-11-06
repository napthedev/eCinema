export const TMDB_API = "https://api.themoviedb.org/3";
export const TMDB_IMAGE = "https://image.tmdb.org/t/p/";

export const imageResize = (src: string, dimension: string = "w200") => `${TMDB_IMAGE}${dimension}${src}`;
export const imageOriginal = (src: string) => `${TMDB_IMAGE}original${src}`;
export const embedMovie = (id: number) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
export const embedEpisode = (id: number, season: number, episode: number) => `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;
