import { useEffect, useRef } from "react";

import type { NextPage } from "next";
import { motion } from "framer-motion";

const Layout: NextPage = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add("on-top");
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
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          delay: 0.3,
        },
      }}
      exit={{
        y: 100,
        opacity: 0,
        transition: {
          duration: 0.7,
        },
      }}
      onScroll={() => {
        if (layoutRef.current) {
          if (layoutRef.current.scrollTop < 10) document.body.classList.add("on-top");
          else document.body.classList.remove("on-top");
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;
