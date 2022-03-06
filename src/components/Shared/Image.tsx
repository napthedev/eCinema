import { FC, HTMLProps, useEffect, useRef, useState } from "react";

interface ImageProps {
  opacity?: number;
  src: string;
}

const Image: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  style,
  crossOrigin: _,
  opacity = 1,
  src,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);
  const [realSrc, setRealSrc] = useState("");

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handler = () => {
      console.log("loaded");
      setLoaded(true);
    };

    const current = imageRef.current;

    current?.addEventListener("load", handler);

    setRealSrc(src);

    return () => current?.removeEventListener("load", handler);
  }, [src]);

  return (
    <img
      ref={imageRef}
      style={{
        ...style,
        transition: "0.3s",
        opacity: loaded ? opacity : 0,
      }}
      alt=""
      src={realSrc}
      {...others}
    />
  );
};

export default Image;
