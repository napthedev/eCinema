import { FC, HTMLProps, useEffect, useRef, useState } from "react";

interface ImageProps {
  opacity?: number;
}

const Image: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  style,
  crossOrigin: _,
  opacity,
  ...others
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current) {
      const handler = () => setLoaded(true);
      imageRef.current.addEventListener("load", handler);

      return () => imageRef.current?.removeEventListener("load", handler);
    }
  }, []);

  return (
    <img
      ref={imageRef}
      style={{ ...style, transition: "0.3s", opacity: loaded ? opacity : 0 }}
      {...others}
    />
  );
};

export default Image;
