import { Cast, Detail, Item, VideoTrailer } from "../../../utils/types";
import type { GetServerSideProps, NextPage } from "next";

import ItemView from "../../../components/ItemView";
import Layout from "../../../components/Layout";
import { getMovieDetails } from "../../../utils/api";

interface MovieProps {
  data: Detail;
  casts: Cast[];
  similar: Item[];
  videos: VideoTrailer[];
}

const Movie: NextPage<MovieProps> = (props) => {
  return (
    <>
      <Layout>
        <ItemView {...props} media_type="movie" />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const movieId = query.id as string;

  try {
    const response = await getMovieDetails(movieId);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
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
