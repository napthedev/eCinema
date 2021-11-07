import { AnimatePresence, motion } from "framer-motion";
import { Detail, Season } from "../../../utils/types";
import { Fragment, useState } from "react";
import { imageOriginal, imageResize } from "../../../utils/constants";

import { GetServerSideProps } from "next";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Meta from "../../../components/Meta";
import type { NextPage } from "next";
import StarRating from "../../../components/StarRating";
import { getTVSeasons } from "../../../utils/api";

interface WatchTVProps {
  seasons: Season[];
  data: Detail;
}

const WatchTV: NextPage<WatchTVProps> = ({ seasons, data }) => {
  const [opened, setOpened] = useState<number | undefined>();

  return (
    <>
      <Meta title={`${data.name} - Seasons - eCinema`} description="View Seasons" image={imageOriginal(data.backdrop_path)} />

      <Layout>
        <div className="flex justify-center">
          <div className="mt-24 md:mx-20 w-full max-w-4xl mx-6">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="md:w-[200px] w-full h-full flex justify-center items-center flex-shrink-0">
                <img src={imageResize(data.poster_path)} alt="" />
              </div>
              <div className="flex flex-col items-start gap-3 flex-grow">
                <Link href={`/tv/${data.id}`}>
                  <h1 className="text-2xl hover:text-orange transition cursor-pointer">{data.name}</h1>
                </Link>
                <p className="text-justify">{data.overview}</p>
                <p className="text-gray-400">{data.last_air_date}</p>
                <StarRating stars={Math.round(data.vote_average)} maximum={10} extraText={` (${data.vote_count} votes)`} />
              </div>
            </div>
            <h1 className="text-2xl mb-8 mt-12">Seasons</h1>
            {seasons.map((item) => (
              <Fragment key={item.season_number}>
                <div className="flex gap-4 mt-4 bg-dark-lighten rounded-2xl overflow-hidden cursor-pointer hover:brightness-90 transition duration-300" onClick={() => (opened === item.season_number ? setOpened(undefined) : setOpened(item.season_number))}>
                  <div className="w-[154px] h-[231px] flex-shrink-0">
                    <img className="w-full h-full" src={imageResize(item.poster_path, "w154")} alt="" />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <h1 className={`text-3xl transition ${opened === item.season_number ? "text-orange" : ""}`}>{item.name}</h1>
                    <p className="text-xl text-gray-400">
                      {item.episodes.length} Episode{item.episodes.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {opened === item.season_number && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto", transition: { duration: 0.3 } }} exit={{ height: 0 }} className="flex flex-col gap-4 overflow-hidden mt-4">
                      {item.episodes.map((child, index) => (
                        <Link href={{ pathname: `/tv/${data.id}/episode`, query: { season: item.season_number, episode: child.episode_number } }}>
                          <div key={child.episode_number} className="flex items-center py-2 bg-dark-darken w-full rounded-lg overflow-hidden cursor-pointer hover:brightness-[80%] transition duration-300">
                            <div className="w-10 hidden md:flex flex-shrink-0 justify-center items-center">
                              <h1 className="text-center">{index + 1}</h1>
                            </div>
                            <img className="w-[154px] h-[87px] flex-shrink-0 mr-4 object-cover rounded-md" src={imageResize(child.still_path, "w154")} alt="" />
                            <div className="flex-grow">
                              <h1>{child.name}</h1>
                              <p className="text-gray-400">{child.air_date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  try {
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    const id = query.id as string;

    const result = await getTVSeasons(id);

    return {
      props: {
        ...result,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default WatchTV;
