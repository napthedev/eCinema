import { Cast, Detail, Item, VideoTrailer } from "@/utils/types";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import ItemView from "@/components/Layout/ItemView";
import { getTVDetails } from "@/utils/api";

interface TVProps {
  data: Detail;
  casts: Cast[];
  similar: Item[];
  videos: VideoTrailer[];
}

const TV: NextPage<TVProps> = (props) => {
  return <ItemView {...props} media_type="tv" />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;

  try {
    const response = await getTVDetails(movieId);
    return {
      props: {
        ...response,
      },
      revalidate: 3600,
    };
  } catch (error) {
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

export default TV;
