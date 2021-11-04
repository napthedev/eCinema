import { FaPlayCircle, FaYoutube } from "react-icons/fa";
import type { GetServerSideProps, NextPage } from "next";
import { MovieDetailRoute, imageResize } from "../../utils/constants";

import Button from "../../components/Button";
import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import { MovieDetail } from "../../utils/types";
import axios from "../../utils/axios";
import { imageOriginal } from "../../utils/constants";

interface MovieProps {
  data: MovieDetail;
}

const Movie: NextPage<MovieProps> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>{data.title} - Movie - eCinema</title>
      </Head>
      <div className="relative h-screen">
        <div style={{ backgroundImage: `url("${imageOriginal(data.backdrop_path)}")`, backgroundPosition: "50%" }} className="mask-image bg-no-repeat bg-cover w-screen h-[500px] absolute top-0 left-0 opacity-50 hidden md:block z-[-1]"></div>
        <div className="pt-52 px-20 flex gap-5">
          <img className="rounded-xl" src={imageResize(data.poster_path, "w300")} alt="" />
          <div className="flex flex-col justify-start gap-3">
            <div className="flex gap-2">
              <Button>
                <FaPlayCircle />
                <span>Watch now</span>
              </Button>
              <Button>
                <FaYoutube />
                <span>Watch trailer</span>
              </Button>
            </div>
            <p className="text-4xl">{data.title}</p>
            <p className="text-lg">{data.overview}</p>
            <div className="flex gap-2">
              {data.genres.map((item) => (
                <span key={item.id} className="bg-dark-lighten border border-white px-3 py-1 rounded-full">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const movieId = query.id as string;

  const data = (await axios.get(MovieDetailRoute(movieId))).data;

  return {
    props: {
      data,
    },
  };
};

export default Movie;
