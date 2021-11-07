import Layout from "../components/Layout";
import Meta from "../components/Meta";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Meta title="404 Not Found - eCinema" description="404 Not Found" image="https://ik.imagekit.io/nap/eCinema/404_ws12IyK4C.png?tr=w-512,h-512,fo-auto" />
      <div className="flex justify-center items-center h-screen">
        <img src="https://ik.imagekit.io/nap/eCinema/404_ws12IyK4C.png?tr=w-512,h-512,fo-auto" alt="" />
      </div>
    </Layout>
  );
};

export default NotFound;
