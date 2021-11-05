import { Item } from "../utils/types";
import Link from "next/link";
import type { NextPage } from "next";
import { imageResize } from "../utils/constants";

interface MovieCardProps {
  item: Item;
}

const MovieCard: NextPage<MovieCardProps> = ({ item }) => {
  return (
    <Link href={item.type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>
      <div className="rounded-lg overflow-hidden cursor-pointer group !w-[200px] inline">
        <img className="group-hover:brightness-75 transition duration-300 w-[200px] h-[300px] object-cover" src={imageResize(item.poster_path)} />
        <p className="p-2 h-16 w-[200px] overflow-hidden bg-dark-darken group-hover:text-red-500 transition duration-300">{item.title || item.name}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
