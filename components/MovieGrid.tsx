import type { NextPage } from "next";
import MovieCard from "./MovieCard";
import { Item } from "../utils/types";
import Pagination from "./Pagination";

interface MovieGridProps {
  data: Item[];
  currentPage: number;
  maximumPage: number;
  resolveLink: (page: number) => string;
}

const MovieGrid: NextPage<MovieGridProps> = ({ data, currentPage, maximumPage, resolveLink }) => {
  return (
    <>
      <div className="grid justify-center gap-5" style={{ gridGap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
        {data.map((item) => (
          <MovieCard item={item} key={item.id} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination current={currentPage} maximum={maximumPage} resolveLink={resolveLink} />
      </div>
    </>
  );
};

export default MovieGrid;
