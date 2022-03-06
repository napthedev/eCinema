import { FC, HTMLProps, useState } from "react";

interface ImageProps {
  opacity?: number;
}

const Image: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  style,
  crossOrigin: _,
  opacity = 1,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      onLoadedData={() => {
        setLoaded(true);
      }}
      onLoad={() => {
        setLoaded(true);
      }}
      style={{
        ...style,
        transition: "0.3s",
        opacity: loaded ? opacity : 0,
      }}
      alt=""
      {...others}
    />
  );
};

export default Image;
