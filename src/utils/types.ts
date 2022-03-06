export interface Item {
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  id: number;
  media_type: "tv" | "movie";
  vote_average: number;
}

export interface Detail {
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  last_air_date: string;
  name: string;
  seasons: {
    episode_count: number;
    season_number: number;
  }[];
}

export interface Season {
  episodes: Episode[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface VideoTrailer {
  name: string;
  key: string;
}

export interface SearchResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: Item[];
}
