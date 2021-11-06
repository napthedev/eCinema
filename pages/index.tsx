import { FaInfoCircle, FaPlayCircle } from "react-icons/fa";
import { imageOriginal, imageResize } from "../utils/constants";

import Button from "../components/Button";
import { Fragment } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Item } from "../utils/types";
import Layout from "../components/Layout";
import Link from "next/link";
import MovieSlider from "../components/MovieSlider";
import type { NextPage } from "next";
import { getHomeData } from "../utils/api";

interface HomeProps {
  data: {
    [id: string]: Item[];
  };
  main: Item;
}

const Home: NextPage<HomeProps> = ({ data, main }) => {
  return (
    <Layout>
      <Head>
        <title>eCinema - Popular movies in one place</title>
      </Head>

      <div className="relative w-screen h-screen flex justify-between items-center gap-6 md:px-20 px-10">
        <div style={{ backgroundImage: `url("${imageOriginal(main.backdrop_path)}")`, backgroundPosition: "50%" }} className="bg-no-repeat bg-cover w-screen h-screen absolute top-0 left-0 opacity-50 hidden md:block"></div>
        <div style={{ backgroundImage: `url("${imageOriginal(main.poster_path)}")`, backgroundPosition: "50%" }} className="bg-no-repeat bg-cover w-screen h-screen absolute top-0 left-0 opacity-50 block md:hidden"></div>
        <div className="z-10 w-auto flex-1 flex justify-center items-center">
          <div className="flex flex-col items-start gap-4">
            <p className="md:text-5xl text-4xl text-gray-100 max-w-xl">{main.title || main.name}</p>
            <p className="md:text-xl text-lg max-w-xl text-gray-100 text-justify multiline-ellipsis">{main.overview}</p>
            <div className="flex gap-3">
              <Link href={`/movie/${main.id}/watch`}>
                <a>
                  <Button>
                    <FaPlayCircle />
                    <span>Watch now</span>
                  </Button>
                </a>
              </Link>
              <Link href={`/movie/${main.id}`}>
                <a>
                  <Button>
                    <FaInfoCircle />
                    <span>View Info</span>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 justify-center items-center hidden md:flex min-w-[300px]">
          <img className="z-10 w-[300px] rounded-xl" src={imageResize(main.poster_path, "w300")} alt="" />
        </div>
      </div>
      {Object.keys(data).map((item) => (
        <Fragment key={item}>
          <h1 className="text-2xl mb-3 mt-8 md:ml-16 ml-4">{item}</h1>
          <MovieSlider data={data[item]} />
        </Fragment>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHomeData();

    const main = data["Trending Movies"][Math.floor(Math.random() * data["Trending Movies"].length)];

    return {
      props: {
        data,
        main,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export default Home;
