import { StoreType } from "@/redux/slice/api/user/homeSlice";
import { FC } from "react";
import { IoIosStar } from "react-icons/io";

import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import { Link } from "react-router-dom";
import moment from "moment";

const StoreCard: FC<{ store: StoreType }> = ({ store }) => {
  const {
    image,
    compressedImage,
    name,
    rating,
    openTime,
    closeTime,
    travelTime,
    deliveryFee,
  } = { ...store };
  const formattedTime1 = moment(openTime).format("hh:mm A");
  const formattedTime2 = moment(closeTime).format("hh:mm A");
  return (
    <Link
      to={`/${store.name}/${store.id}`}
      className="w-1/4 rounded-lg flex flex-col gap-2 bg-zinc-800"
    >
      <LazyLoadedImageComponent
        image={image || ""}
        alt={name}
        compressedImage={compressedImage || ""}
        className="rounded-t-lg"
      />
      <div className="flex flex-col gap-1 px-3 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">{name}</h3>
          <p className="bg-primary rounded h-5 flex justify-center items-center text-zinc-100 gap-1 w-fit p-1">
            <IoIosStar className="h-3 w-3" />
            {rating}
          </p>
        </div>{" "}
        <p className="text-[0.9rem]">
          {formattedTime1} - {formattedTime2}
        </p>
        <div className="flex items-center gap-2 text-zinc-300 text-[0.9rem]">
          <p className={`${deliveryFee === 0 && "text-yellow-700"}`}>
            ${deliveryFee} Delivery Fee{" "}
          </p>{" "}
          <span className="bg-zinc-200 h-[3px] w-[3px] rounded-full"></span>
          <p>
            {travelTime.min}-{travelTime.max} min
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
