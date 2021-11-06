import { Detail } from "./types";
import axios from "./axios";

export const getHomeData: () => Promise<any> = async () => {
  const HomeAPIRoutes: { [key: string]: { url: string; type: "tv" | "movie" } } = {
    "Trending Movies": { url: "/trending/movie/week", type: "movie" },
    "Popular Movies": { url: "/movie/popular", type: "movie" },
    "Top Rated Movies": { url: "/movie/top_rated", type: "movie" },
    "Trending TV": { url: "/trending/tv/week", type: "tv" },
    "Popular TV": { url: "/tv/popular", type: "tv" },
    "Top Rated TV": { url: "/tv/top_rated", type: "tv" },
  };

  const promises = await Promise.all(Object.keys(HomeAPIRoutes).map((item) => axios.get(HomeAPIRoutes[item].url)));

  const data = promises.reduce((final, current, index) => {
    final[Object.keys(HomeAPIRoutes)[index]] = current.data.results.map((item: any) => ({ ...item, type: HomeAPIRoutes[Object.keys(HomeAPIRoutes)[index]].type }));
    return final;
  }, {} as any);

  return data;
};

export const getWatchMovieContent: (id: string) => Promise<any> = async (id) => {
  const labels = ["data", "similar"];

  const result = (await Promise.all([axios.get(`/movie/${id}`), axios.get(`/movie/${id}/similar`)])).reduce((final, current, index) => {
    if (labels[index] === "data") {
      final[labels[index]] = current.data;
    } else if (labels[index] === "similar") {
      final[labels[index]] = current.data.results.map((item: any) => ({ ...item, type: "movie" }));
    }
    return final;
  }, {} as any);

  return result;
};

export const getSimilarTVs: (id: string) => Promise<any> = async (id) => {
  const data = (await axios.get(`/movie/${id}/similar`)).data.results.map((item: any) => ({ ...item, type: "movie" }));
  return data;
};

export const getMovieDetails: (id: string) => Promise<any> = async (id) => {
  const labels = ["data", "casts", "similar", "videos"];

  const result = (await Promise.all([axios.get(`/movie/${id}`), axios.get(`/movie/${id}/credits`), axios.get(`/movie/${id}/similar`), axios.get(`/movie/${id}/videos`)])).reduce((final, current, index) => {
    if (labels[index] === "data") {
      final[labels[index]] = current.data;
    } else if (labels[index] === "casts") {
      final[labels[index]] = current.data.cast.filter((item: any) => item.name && item.character && item.profile_path).slice(0, 10);
    } else if (labels[index] === "similar") {
      final[labels[index]] = current.data.results.map((item: any) => ({ ...item, type: "movie" }));
    } else if (labels[index] === "videos") {
      final[labels[index]] = current.data.results.filter((item: any) => item.name && item.site === "YouTube");
    }

    return final;
  }, {} as any);

  return result;
};

export const getTVDetails: (id: string) => Promise<any> = async (id) => {
  const labels = ["data", "casts", "similar", "videos"];

  const result = (await Promise.all([axios.get(`/tv/${id}`), axios.get(`/tv/${id}/credits`), axios.get(`/tv/${id}/similar`), axios.get(`/tv/${id}/videos`)])).reduce((final, current, index) => {
    if (labels[index] === "data") {
      final[labels[index]] = current.data;
    } else if (labels[index] === "casts") {
      final[labels[index]] = current.data.cast.filter((item: any) => item.name && item.character && item.profile_path).slice(0, 10);
    } else if (labels[index] === "similar") {
      final[labels[index]] = current.data.results.map((item: any) => ({ ...item, type: "tv" }));
    } else if (labels[index] === "videos") {
      final[labels[index]] = current.data.results.filter((item: any) => item.name && item.site === "YouTube");
    }

    return final;
  }, {} as any);

  return result;
};

export const getTVSeasons: (id: string) => Promise<any> = async (id) => {
  const data = (await axios.get(`/tv/${id}`)).data as Detail;

  if (data.seasons.length === 0) throw new Error("404");

  const res = await Promise.all(data.seasons.map((item) => axios.get(`/tv/${id}/season/${item.season_number}`)));

  const seasons = res.map((item) => item.data).filter((item) => item.name && item.poster_path && item.episodes.length > 0 && item.episodes.every((child: any) => child.name && child.still_path));

  return {
    seasons,
    data,
  };
};
