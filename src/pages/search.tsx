import { FormEvent, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { GetServerSideProps } from "next";
import Meta from "../components/Shared/Meta";
import MovieGrid from "../components/Movie/MovieGrid";
import type { NextPage } from "next";
import { SearchResult } from "../utils/types";
import { search } from "../utils/api";
import { useRouter } from "next/router";

interface SearchProps {
  result: SearchResult;
  newPage: boolean;
  q: string;
}

const Search: NextPage<SearchProps> = ({ result, newPage = false, q }) => {
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      router.push({ pathname: "/search", query: { q: searchInputValue } });
    }
  };

  return (
    <>
      <Meta
        title={newPage ? "Search - eCinema" : `${q} - Search - eCinema`}
        description={
          newPage ? "Searching for movies" : `Search result for ${q}`
        }
        image="/preview.png"
      />
      <div className="min-h-screen pt-24">
        {newPage ? (
          <form
            className="flex flex-col items-center justify-center md:mt-12 mx-8"
            onSubmit={handleSearchFormSubmit}
          >
            <h1 className="text-center text-3xl mb-6">
              Find your favorite movies and TV shows
            </h1>
            <div className="w-full max-w-xl relative">
              <button
                type="submit"
                className="absolute top-1/2 left-4 -translate-y-1/2"
              >
                <FaSearch size={25} />
              </button>
              <input
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="w-full h-full p-3 pl-14 text-2xl outline-none bg-dark-darken text-gray-100 placeholder-gray-500 rounded"
                type="text"
                placeholder="Search..."
              />
            </div>
          </form>
        ) : (
          <div className="md:mx-20 mx-10">
            <h1 className="text-2xl mb-8">
              Search result for &quot;{q}&quot; ({result.total_results}{" "}
              {result.total_results <= 1 ? "result" : "results"} found)
            </h1>
            <MovieGrid
              data={result.results}
              currentPage={result.page}
              maximumPage={result.total_pages}
              resolveLink={(page) =>
                `/search?q=${encodeURIComponent(q)}&page=${page}`
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const q = query.q as string;
    const page = query.page ? Number(query.page) : 1;

    if (!q) {
      return {
        props: {
          newPage: true,
        },
      };
    }

    const response = await search(q, page);

    return {
      props: {
        result: response,
        q,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Search;
