import { Detail, Item } from "../../../utils/types";
import { embedMovie, imageResize } from "../../../utils/constants";

import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import StarRating from "../../../components/StarRating";
import { getWatchMovieContent } from "../../../utils/api";

interface WatchMovieProps {
  data: Detail;
  similar: Item[];
}

const WatchMovie: NextPage<WatchMovieProps> = ({ similar, data }) => {
  return (
    <>
      <Head>
        <title>{data.title} - Watch movie - eCinema</title>
      </Head>
      <Layout>
        <div className="mt-28 flex px-20 gap-8">
          <div className="flex-grow">
            <div className="relative h-0 w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe className="absolute top-0 left-0 w-full h-full" src={embedMovie(data.id)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="my-10 flex flex-col items-start gap-4">
              <Link href={`/movie/${data.id}`}>
                <a className="text-2xl hover:text-orange transition">{data.title}</a>
              </Link>
              <p>{data.overview}</p>
              <p>Release Date: {data.release_date}</p>
              <StarRating maximum={10} stars={Math.round(data.vote_average)} extraText={` (${data.vote_count} votes)`} />
            </div>
          </div>
          <div className="flex-shrink-0 w-72 flex flex-col gap-4 overflow-y-auto max-h-screen">
            <h1 className="text-xl">Similar Movies</h1>
            {similar.map((item) => (
              <Link href={`/movie/${item.id}`}>
                <div className="flex gap-4 pr-5 group cursor-pointer">
                  <img className="w-[80px] h-auto group-hover:brightness-75 transition duration-300" src={imageResize(item.poster_path, "w92")} alt="" />
                  <div className="py-3 group-hover:text-orange transition duration-300">
                    <h1>{item.title}</h1>
                    <StarRating stars={Math.round(item.vote_average / 2)} maximum={5} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const id = query.id as string;
    const response = await getWatchMovieContent(id);

    return {
      props: {
        ...response,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default WatchMovie;
