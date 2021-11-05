import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Item } from "../utils/types";
import Link from "next/link";
import type { NextPage } from "next";
import { imageResize } from "../utils/constants";

interface MovieSliderProps {
  data: Item[];
}

const MovieSlider: NextPage<MovieSliderProps> = ({ data }) => {
  return (
    <Swiper className="!w-[calc(100vw-16px)] md:!px-14 !px-2" modules={[Navigation, Autoplay]} spaceBetween={30} autoplay={{ delay: 5000, disableOnInteraction: true }} slidesPerView="auto" loop slidesPerGroupAuto navigation>
      <div className="!flex">
        {data.map((item) => (
          <SwiperSlide key={item.id} className="!w-[200px] !flex">
            <Link href={item.type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>
              <div className="rounded-lg overflow-hidden cursor-pointer group !w-[200px] inline">
                <img className="group-hover:brightness-75 transition duration-300 w-[200px] h-[300px] object-cover" src={imageResize(item.poster_path)} />
                <p className="p-2 h-16 w-[200px] overflow-hidden bg-dark-darken group-hover:text-red-500 transition duration-300">{item.title || item.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default MovieSlider;
