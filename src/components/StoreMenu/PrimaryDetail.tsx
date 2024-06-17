import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { BiFoodTag } from "react-icons/bi";

type PrimaryDetailProps = {
  name: string;
  description: string;
  price: number;
  categoryName: string;
  isVeg: boolean;
  prepTime: number;
};
const PrimaryDetail: React.FC<PrimaryDetailProps> = ({
  name,
  description,
  price,
  categoryName,
  isVeg,
  prepTime,
}) => {
  return (
    <section className="flex gap-4 flex-col">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-zinc-400 text-lg">{description}</p>
      <p className="font-bold text-2xl">
        Price <span className="text-green-700">${price}</span>
      </p>
      <p className="text-xl flex gap-2 items-center">
        <span>{categoryName}</span>|{" "}
        <span className="flex items-center gap-2">
          <BiFoodTag
            className={`${isVeg ? "fill-green-700" : "fill-red-700"} h-6 w-6`}
          />
          {isVeg ? "Veg" : "Non-Veg"}
        </span>{" "}
        |{" "}
        <span className="flex items-center gap-2">
          <FaRegClock /> {prepTime} mins
        </span>
      </p>
    </section>
  );
};

export default PrimaryDetail;
