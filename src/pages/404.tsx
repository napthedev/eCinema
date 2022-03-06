import Meta from "../components/Shared/Meta";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <>
      <Meta
        title="404 Not Found - eCinema"
        description="404 Not Found"
        image="/not-found.png"
      />
      <div className="flex justify-center items-center h-screen">
        <img src="/not-found.png" alt="" />
      </div>
    </>
  );
};

export default NotFound;
