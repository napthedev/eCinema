import { Detail, Item } from "@/utils/types";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { embedMovie, imageOriginal, imageResize } from "@/utils/constants";

import Image from "@/components/Shared/Image";
import Link from "next/link";
import Meta from "@/components/Shared/Meta";
import StarRating from "@/components/Display/StarRating";
import { getWatchMovieContent } from "@/utils/api";

interface WatchMovieProps {
  data: Detail;
  similar: Item[];
}

const WatchMovie: NextPage<WatchMovieProps> = ({ similar, data }) => {
  return (
    <>
      <Meta
        title={`${data.title} - Watch Episode - eCinema`}
        description="Watch the movie"
        image={imageOriginal(data.backdrop_path)}
      />
      <div className="mt-28 flex flex-col lg:flex-row px-5 lg:px-20 gap-8">
        <div className="flex-grow">
          <div
            className="relative h-0 w-full"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedMovie(data.id)}
              title=""
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="my-10 flex flex-col items-start gap-4">
            <Link href={`/movie/${data.id}`}>
              <a className="text-2xl hover:text-orange transition">
                {data.title}
              </a>
            </Link>
            <p>{data.overview}</p>
            <p>Release Date: {data.release_date}</p>
            <StarRating
              maximum={10}
              stars={Math.round(data.vote_average)}
              extraText={` (${data.vote_count} votes)`}
            />
          </div>
        </div>
        <div className="flex-shrink-0 w-full lg:w-80 flex flex-col gap-4 overflow-y-auto lg:max-h-screen">
          <h1 className="text-xl">Similar Movies</h1>
          {similar.map((item) => (
            <Link key={item.id} href={`/movie/${item.id}`}>
              <a>
                <div className="flex gap-4 pr-5 group cursor-pointer">
                  <Image
                    className="w-[80px] h-[120px] object-cover group-hover:brightness-75 transition duration-300"
                    src={imageResize(item.poster_path, "w92")}
                    alt=""
                  />
                  <div className="py-3 group-hover:text-orange transition duration-300">
                    <h1>{item.title}</h1>
                    <StarRating
                      stars={Math.round(item.vote_average / 2)}
                      maximum={5}
                    />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const response = await getWatchMovieContent(id);

    return {
      props: {
        ...response,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default WatchMovie;
