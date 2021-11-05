import { Cast, Detail, Item, VideoTrailer } from "../../utils/types";
import type { GetServerSideProps, NextPage } from "next";

import ItemView from "../../components/ItemView";
import Layout from "../../components/Layout";
import { getTVDetails } from "../../utils/api";

interface TVProps {
  data: Detail;
  casts: Cast[];
  similar: Item[];
  videos: VideoTrailer[];
}

const TV: NextPage<TVProps> = (props) => {
  return (
    <Layout>
      <ItemView {...props} type="tv" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const movieId = query.id as string;

  try {
    const response = await getTVDetails(movieId);

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

export default TV;
