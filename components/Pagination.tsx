import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Link from "next/link";
import type { NextPage } from "next";

interface PaginationProps {
  current: number;
  maximum: number;
  resolveLink: (page: number) => string;
}

const Pagination: NextPage<PaginationProps> = ({ current, maximum, resolveLink }) => {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {current > 1 && (
        <Link href={resolveLink(current - 1)}>
          <button className="rounded-btn">
            <FaChevronLeft />
          </button>
        </Link>
      )}
      {current < 5 ? (
        <>
          {new Array(maximum < 5 ? maximum : 5).fill("").map((_, index) => (
            <Link key={index} href={resolveLink(index + 1)}>
              <button className={`rounded-btn ${current === index + 1 ? "!bg-orange" : ""}`}>{index + 1}</button>
            </Link>
          ))}
          {maximum > 5 && (
            <>
              <span>...</span>
              <Link href={resolveLink(maximum)}>
                <button className="rounded-btn">{maximum}</button>
              </Link>
            </>
          )}
        </>
      ) : current > maximum - 5 ? (
        <>
          <Link href={resolveLink(1)}>
            <button className="rounded-btn">1</button>
          </Link>
          <span>...</span>
          {new Array(5).fill("").map((_, index) => (
            <Link key={index} href={resolveLink(maximum - 4 + index)}>
              <button className={`rounded-btn ${current === maximum - 4 + index ? "!bg-orange" : ""}`}>{maximum - 4 + index}</button>
            </Link>
          ))}
        </>
      ) : (
        <>
          <Link href={resolveLink(1)}>
            <button className="rounded-btn">1</button>
          </Link>
          <span>...</span>
          {new Array(5).fill("").map((_, index) => (
            <Link key={index} href={resolveLink(current - 5 + index)}>
              <button className={`rounded-btn ${current === current - 5 + index ? "!bg-orange" : ""}`}>{current - 2 + index}</button>
            </Link>
          ))}
          <span>...</span>
          <Link href={resolveLink(maximum)}>
            <button className="rounded-btn">{maximum}</button>
          </Link>
        </>
      )}
      {current < maximum && (
        <Link href={resolveLink(current + 1)}>
          <button className="rounded-btn">
            <FaChevronRight />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
