import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import type { NextPage } from "next";

const Navbar: NextPage = () => {
  return (
    <div
      style={{ minHeight: "60px" }}
      className="fixed top-0 left-0 right-0 w-screen py-3 md:px-7 px-3 h-[7vw] max-h-16 z-50 flex justify-between items-center transition duration-500 bg-transparent navbar"
    >
      <Link href="/">
        <a className="h-full w-auto">
          <img className="h-full w-auto" src="/logo.png" alt="" />
        </a>
      </Link>
      <Link href="/search">
        <a>
          <FaSearch className="mr-4 cursor-pointer" size={25} />
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
