import Head from "next/head";
import Layout from "../components/Layout";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>404 Not Found - eCinema</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <img src="https://ik.imagekit.io/nap/eCinema/404_ws12IyK4C.png?tr=w-512,h-512,fo-auto" alt="" />
      </div>
    </Layout>
  );
};

export default NotFound;
