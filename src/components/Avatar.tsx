import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  name: string;
  onClick?: () => void;
};
const Avatar: React.FC<Props> = ({ className, name, onClick }) => {
  const firstCharacter = name?.split(" ")[0]?.split("")[0];
  const lastCharacter = name?.split(" ")[1]?.split("")[0];
  return (
    <div
      className={twMerge(
        `rounded-full bg-zinc-200 text-zinc-700 flex justify-center items-center font-medium w-full h-full`,
        className
      )}
      style={{ lineHeight: "1" }}
    >
      {onClick ? (
        <div
          className={`h-full w-full justify-center flex items-center`}
          onClick={onClick}
        >{`${firstCharacter}${lastCharacter}`}</div>
      ) : (
        <p>{`${firstCharacter}${lastCharacter}`}</p>
      )}
    </div>
  );
};

export default Avatar;
