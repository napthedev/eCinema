import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Link from "next/link";
import type { NextPage } from "next";

interface PaginationProps {
  current: number;
  maximum: number;
  resolveLink: (page: number) => string;
}

const Pagination: NextPage<PaginationProps> = ({
  current,
  maximum,
  resolveLink,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {current > 1 && (
        <Link href={resolveLink(current - 1)}>
          <a>
            <button className="rounded-btn">
              <FaChevronLeft />
            </button>
          </a>
        </Link>
      )}
      {current < 5 ? (
        <>
          {new Array(maximum < 5 ? maximum : 5).fill("").map((_, index) => (
            <Link key={index} href={resolveLink(index + 1)}>
              <a>
                <button
                  className={`rounded-btn ${
                    current === index + 1 ? "!bg-orange" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </a>
            </Link>
          ))}
          {maximum > 5 && (
            <>
              <span>...</span>
              <Link href={resolveLink(maximum)}>
                <a>
                  <button className="rounded-btn">{maximum}</button>
                </a>
              </Link>
            </>
          )}
        </>
      ) : current > maximum - 4 ? (
        <>
          <Link href={resolveLink(1)}>
            <a>
              <button className="rounded-btn">1</button>
            </a>
          </Link>
          <span>...</span>
          {new Array(5).fill("").map((_, index) => (
            <Link key={index} href={resolveLink(maximum - 4 + index)}>
              <a>
                <button
                  className={`rounded-btn ${
                    current === maximum - 4 + index ? "!bg-orange" : ""
                  }`}
                >
                  {maximum - 4 + index}
                </button>
              </a>
            </Link>
          ))}
        </>
      ) : (
        <>
          <Link href={resolveLink(1)}>
            <a>
              <button className="rounded-btn">1</button>
            </a>
          </Link>
          <span>...</span>
          {new Array(5).fill("").map((_, index) => (
            <Link key={index} href={resolveLink(current - 2 + index)}>
              <a>
                <button
                  className={`rounded-btn ${
                    current === current - 2 + index ? "!bg-orange" : ""
                  }`}
                >
                  {current - 2 + index}
                </button>
              </a>
            </Link>
          ))}
          <span>...</span>
          <Link href={resolveLink(maximum)}>
            <a>
              <button className="rounded-btn">{maximum}</button>
            </a>
          </Link>
        </>
      )}
      {current < maximum && (
        <Link href={resolveLink(current + 1)}>
          <a>
            <button className="rounded-btn">
              <FaChevronRight />
            </button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
