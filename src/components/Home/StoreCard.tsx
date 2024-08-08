import { StoreType } from "@/redux/slice/api/user/homeSlice";
import { FC } from "react";
import { IoIosStar } from "react-icons/io";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { IoMoonSharp } from "react-icons/io5";
import { checkIfOpen } from "@/utils/ConstantFunctions";
import StorePlaceholderImage from "@/assets/store_placeholder.webp";

const ClosedStore = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-orange-300"
      aria-hidden="true"
    >
      <IoMoonSharp aria-hidden="true" />
      <p className="text-[1rem] font-semibold">Closed</p>
    </div>
  );
};

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

  const formattedOpenTime = moment(openTime).format("hh:mm A");
  const formattedCloseTime = moment(closeTime).format("hh:mm A");

  return (
    <Link
      to={`/${store.name}/${store.id}`}
      className="w-full sm:w-[48.5%] xl:w-1/4 rounded-sm flex flex-col gap-2 bg-zinc-800 relative"
      aria-label={`Link to ${name} store details`}
    >
      {image ? (
        <LazyLoadedImageComponent
          image={image || ""}
          alt={`${name} image`}
          className="rounded-t-sm"
          compressedImage={compressedImage || ""}
        />
      ) : (
        <div className="w-full">
          <img
            src={StorePlaceholderImage}
            aria-label="store image placeholder"
            alt="store image placeholder"
            className="h-full w-full rounded-t-sm"
          />
        </div>
      )}
      {!checkIfOpen(openTime, closeTime) && <ClosedStore />}
      <section className="flex flex-col gap-1 px-3 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">{name}</h3>
          <p
            className="bg-primary rounded h-5 flex justify-center items-center text-zinc-100 gap-1 w-fit p-1"
            aria-label={`Rating of ${name}: ${rating} stars`}
          >
            <IoIosStar className="h-3 w-3" aria-hidden="true" />
            {rating}
          </p>
        </div>
        <p className="text-[0.9rem]">
          {formattedOpenTime} - {formattedCloseTime}
        </p>
        <div className="flex items-center gap-2 text-zinc-300 text-[0.9rem]">
          <p
            className={`${deliveryFee === 0 && "text-yellow-700"}`}
            aria-label={`Delivery fee: $${deliveryFee}`}
          >
            ${deliveryFee} Delivery Fee
          </p>
          <span
            className="bg-zinc-200 h-[3px] w-[3px] rounded-full"
            aria-hidden="true"
          ></span>
          <p aria-label={`Travel time: ${travelTime.min} to ${travelTime.max} minutes`}>
            {travelTime.min}-{travelTime.max} min
          </p>
        </div>
      </section>
    </Link>
  );
};

export default StoreCard;
