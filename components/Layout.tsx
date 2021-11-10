import { useEffect, useRef } from "react";

import Footer from "./Footer";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useInnerWidth } from "../hooks/useInnerWidth";

const Layout: NextPage = ({ children }) => {
  const MOBILE_WIDTH = 768;
  const width = useInnerWidth();

  const layoutRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.body.classList.remove("scrolled");
  }, []);

  return (
    <motion.div
      ref={layoutRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
      }}
      key={width}
      initial={
        width > MOBILE_WIDTH
          ? {
              y: 100,
              opacity: 0,
            }
          : {}
      }
      animate={
        width > MOBILE_WIDTH
          ? {
              x: 0,
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: 0.2,
              },
            }
          : {}
      }
      exit={
        width > MOBILE_WIDTH
          ? {
              y: 100,
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }
          : {}
      }
      onScroll={() => {
        if (layoutRef.current) {
          if (layoutRef.current.scrollTop < 10) document.body.classList.remove("scrolled");
          else document.body.classList.add("scrolled");
        }
      }}
    >
      {children}
      <Footer />
    </motion.div>
  );
};

export default Layout;
