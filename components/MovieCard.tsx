import { Item } from "../utils/types";
import Link from "next/link";
import type { NextPage } from "next";
import { imageResize } from "../utils/constants";

interface MovieCardProps {
  data: Item;
}

const MovieCard: NextPage<MovieCardProps> = ({ data }) => {
  return (
    <Link href={data.type === "tv" ? `/tv/${data.id}` : `/movie/${data.id}`}>
      <div className="rounded-lg overflow-hidden cursor-pointer group">
        <img className="group-hover:brightness-75 transition duration-300 w-[200px] h-[300px] object-cover" src={imageResize(data.poster_path)} />
        <p className="p-2 h-16 overflow-hidden bg-dark-darken group-hover:text-red-500 transition duration-300">{data.title || data.name}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
