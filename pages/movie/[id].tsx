import { AnimatePresence, motion } from "framer-motion";
import { Cast, Item, MovieDetail, VideoTrailer } from "../../utils/types";
import { FaPlayCircle, FaYoutube } from "react-icons/fa";
import type { GetServerSideProps, NextPage } from "next";
import { imageOriginal, imageResize } from "../../utils/constants";

import Button from "../../components/Button";
import { FaTimes } from "react-icons/fa";
import Head from "next/head";
import Layout from "../../components/Layout";
import MovieSlider from "../../components/MovieSlider";
import StarRating from "../../components/StarRating";
import { getMovieDetails } from "../../utils/api";
import { useState } from "react";

interface MovieProps {
  data: MovieDetail;
  casts: Cast[];
  similar: Item[];
  videos: VideoTrailer[];
}

const Movie: NextPage<MovieProps> = ({ data, casts, similar, videos }) => {
  const [trailerModalOpened, setTrailerModalOpened] = useState(false);

  return (
    <Layout>
      <Head>
        <title>{data.title} - Movie - eCinema</title>
      </Head>
      <div className="relative min-h-screen">
        <div style={{ backgroundImage: `url("${imageOriginal(data.backdrop_path)}")`, backgroundPosition: "50%" }} className="mask-image bg-no-repeat bg-cover w-screen h-[350px] md:h-[500px] absolute top-0 left-0 opacity-50 block z-[-1]"></div>
        <div className="md:pt-52 pt-24 px-10 md:px-20 flex flex-col md:flex-row gap-5">
          <div className="md:w-[300px] w-full flex-shrink-0 flex justify-center items-start">
            <img className="rounded-xl" src={imageResize(data.poster_path, "w300")} alt="" />
          </div>
          <div className="flex flex-col justify-start gap-3">
            <div className="flex gap-2 justify-center md:justify-start">
              <Button>
                <FaPlayCircle />
                <span>Watch now</span>
              </Button>
              <Button onClick={() => setTrailerModalOpened(true)}>
                <FaYoutube />
                <span>Watch trailer</span>
              </Button>
            </div>
            <p className="text-4xl">{data.title}</p>
            <p className="text-lg text-justify">{data.overview}</p>
            {data.release_date && <p>Release Date: {data.release_date}</p>}
            {data.genres && (
              <div className="flex gap-2 flex-wrap">
                {data.genres.map((item) => (
                  <span key={item.id} className="bg-dark-lighten border border-white px-3 py-1 rounded-full whitespace-nowrap">
                    {item.name}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center">{data.vote_average && <StarRating stars={Math.round(data.vote_average)} maximum={10} extraText={` (${data.vote_count} votes)`} />}</div>
          </div>
        </div>
        <div className="mt-10 md:mt-20 px-10 md:px-20">
          {data.homepage && (
            <p className="text-xl" style={{ wordBreak: "break-all" }}>
              Official website:{" "}
              <a className="text-orange" href={data.homepage} target="_blank" rel="noopener noreferrer">
                {data.homepage}
              </a>
            </p>
          )}
          {casts && (
            <>
              <h1 className="text-2xl my-8">Casts</h1>

              <div className="grid gap-3" style={{ gridGap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                {casts.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    <img className="w-full h-auto object-cover rounded-xl" src={imageResize(item.profile_path)} alt="" />
                    <p className="text-center">{item.name}</p>
                    <p className="text-orange text-center">{item.character}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {similar && (
          <>
            <h1 className="my-10 text-2xl px-10 md:px-20">Similar Movies</h1>
            <MovieSlider data={similar} loop={false} />
          </>
        )}
      </div>
      <AnimatePresence>
        {trailerModalOpened && (
          <motion.div onClick={() => setTrailerModalOpened(false)} className="fixed top-0 left-0 z-[60] w-screen h-screen flex justify-center items-center bg-[#2a2a2a80]" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0 }}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-h-screen max-w-xl flex flex-col gap-3 items-start overflow-y-auto bg-dark-lighten p-5 rounded-lg">
              <div className="flex justify-between w-full">
                <h1 className="text-2xl ml-2">Movie Trailer</h1>
                <button className="cursor-pointer" onClick={() => setTrailerModalOpened(false)}>
                  <FaTimes size={30} />
                </button>
              </div>
              {videos ? (
                videos.map((item) => (
                  <>
                    <h1 className="text-lg mx-2 mt-4">{item.name}</h1>
                    <div className="relative h-0 w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </>
                ))
              ) : (
                <h1>No video trailer found</h1>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const movieId = query.id as string;

  try {
    const response = await getMovieDetails(movieId);

    res.setHeader("Cache-Control", "public, max-age=99999");
    return {
      props: {
        ...response,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Movie;
