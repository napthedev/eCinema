import { useEffect, useRef, useState } from "react";

export const useInnerWidth = () => {
  const [width, setWidth] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth);

      const handler = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setWidth(window.innerWidth);
        }, 200);
      };

      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }
  }, []);

  return width;
};
