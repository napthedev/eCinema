export interface Item {
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: 8;
  overview: string;
  release_date: string;
  vote_count: number;
  backdrop_path: string;
  id: number;
  genre_ids: number[];
  popularity: number;
  type: "tv" | "movie";
}

export interface MovieDetail {
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}
