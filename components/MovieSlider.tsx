import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

import { Item } from "../utils/types";
import MovieCard from "./MovieCard";
import { Navigation } from "swiper";
import type { NextPage } from "next";

interface MovieSliderProps {
  data: Item[];
}

const MovieSlider: NextPage<MovieSliderProps> = ({ data }) => {
  return (
    <Swiper className="w-[calc(100vw-10px)]" modules={[Navigation]} spaceBetween={50} slidesPerView="auto" slidesPerGroupAuto navigation>
      {data.map((item, index) => (
        <SwiperSlide key={item.id} className={`${index === 0 ? "md:ml-14 ml-4" : index === data.length - 1 ? "md:mr-14 mr-4" : ""}`} style={{ width: 200 }}>
          <MovieCard data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieSlider;
