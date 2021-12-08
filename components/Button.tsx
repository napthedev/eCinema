import { HTMLProps } from "react";
import type { NextPage } from "next";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: NextPage<ButtonProps & HTMLProps<HTMLButtonElement>> = ({
  className,
  ...others
}) => {
  return (
    <button
      {...others}
      className={`bg-dark-lighten hover:bg-dark-darken text-white transition duration-300 py-3 px-6 rounded-md outline-none flex items-center gap-2 whitespace-nowrap ${className}`}
    ></button>
  );
};

export default Button;
