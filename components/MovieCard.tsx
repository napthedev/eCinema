import { Item } from "../utils/types";
import Link from "next/link";
import type { NextPage } from "next";
import { imageResize } from "../utils/constants";

interface MovieCardProps {
  item: Item;
}

const MovieCard: NextPage<MovieCardProps> = ({ item }) => {
  return (
    <Link href={item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>
      <div className="rounded-lg overflow-hidden cursor-pointer group flex flex-col items-center">
        <img className="group-hover:brightness-75 transition duration-300 w-full" src={imageResize(item.poster_path)} />
        <p className="p-2 h-[60px] w-full overflow-hidden bg-dark-darken group-hover:text-red transition duration-300">{item.title || item.name}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
