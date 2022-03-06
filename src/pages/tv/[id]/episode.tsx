import { Detail, Episode, Season } from "@/utils/types";
import { Fragment, useState } from "react";
import { embedEpisode, imageOriginal } from "@/utils/constants";

import { GetServerSideProps } from "next";
import Image from "@/components/Shared/Image";
import Link from "next/link";
import Meta from "@/components/Shared/Meta";
import type { NextPage } from "next";
import StarRating from "@/components/Display/StarRating";
import { getTVSeasons } from "@/utils/api";
import { imageResize } from "@/utils/constants";

interface TVEpisodeProps {
  seasons: Season[];
  data: Detail;
  seasonId: number;
  episodeId: number;
  episode: Episode;
}

const TVEpisode: NextPage<TVEpisodeProps> = ({
  seasons,
  data,
  seasonId,
  episodeId,
  episode,
}) => {
  const [opened, setOpened] = useState<number | undefined>(Number(seasonId));

  return (
    <>
      <Meta
        title={`${data.name} - Episode ${episodeId} - Season ${seasonId} - eCinema`}
        description="Watch TV Episode"
        image={imageOriginal(episode.still_path)}
      />
      <div className="mt-28 flex flex-col lg:flex-row px-5 lg:px-20 gap-8">
        <div className="flex-grow">
          <div
            className="relative h-0 w-full"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedEpisode(data.id, seasonId, episodeId)}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="my-10 flex flex-col items-start gap-2">
            <Link href={`/tv/${data.id}`}>
              <a className="text-2xl hover:text-orange transition">
                {data.name}
              </a>
            </Link>
            <h1 className="text-xl">{episode.name}</h1>
            <p>{episode.overview}</p>
            <p>Release Date: {episode.air_date}</p>
            <StarRating
              maximum={10}
              stars={Math.round(episode.vote_average)}
              extraText={` (${episode.vote_count} votes)`}
            />
          </div>
        </div>
        <div className="flex-shrink-0 w-full lg:w-80 flex flex-col gap-2">
          <h1 className="text-xl">Other episodes</h1>
          {seasons.map((item) => (
            <Fragment key={item.season_number}>
              <div
                className="flex gap-2 mt-1 bg-dark-lighten rounded overflow-hidden cursor-pointer hover:brightness-90 transition duration-300"
                onClick={() =>
                  opened === item.season_number
                    ? setOpened(undefined)
                    : setOpened(item.season_number)
                }
              >
                <div className="w-[45px] h-[68px] flex-shrink-0">
                  <Image
                    className="w-full h-full"
                    src={imageResize(item.poster_path, "w45")}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h1
                    className={`text-lg transition ${
                      opened === item.season_number ? "text-orange" : ""
                    }`}
                  >
                    {item.name}
                  </h1>
                </div>
              </div>

              {opened === item.season_number && (
                <div className="flex flex-col gap-2">
                  {item.episodes.map((child) => (
                    <Link
                      key={child.episode_number}
                      href={{
                        pathname: `/tv/${data.id}/episode`,
                        query: {
                          season: item.season_number,
                          episode: child.episode_number,
                        },
                      }}
                    >
                      <a>
                        <div className="flex items-center bg-dark-darken w-full rounded-lg overflow-hidden cursor-pointer hover:brightness-[80%] transition duration-300">
                          <Image
                            className="w-[154px] h-[87px] flex-shrink-0 mr-4 object-cover rounded-md"
                            src={imageResize(child.still_path, "w154")}
                            alt=""
                          />
                          <div className="flex-grow">
                            <p
                              className={`${
                                child.episode_number === Number(episodeId)
                                  ? "text-orange"
                                  : ""
                              }`}
                            >
                              Episode {child.episode_number}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  try {
    const id = params?.id as string;

    const seasonId = query.season as string;
    const episodeId = query.episode as string;

    if (!seasonId || !episodeId) return { notFound: true };

    const response = (await getTVSeasons(id)) as {
      data: Detail;
      seasons: Season[];
    };

    const episode = response.seasons
      .find((item) => item.season_number === Number(seasonId))
      ?.episodes.find((item) => item.episode_number === Number(episodeId));

    if (!episode) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...response,
        seasonId,
        episodeId,
        episode,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default TVEpisode;
