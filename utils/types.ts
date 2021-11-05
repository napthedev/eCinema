export interface Item {
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  id: number;
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
