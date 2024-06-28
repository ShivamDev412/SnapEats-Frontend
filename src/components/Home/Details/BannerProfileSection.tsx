import LazyLoadedImageComponent from "@/components/LazyLoadedImageComponent";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { IoMoonSharp, IoTimeOutline } from "react-icons/io5";
import { FC } from "react";
import Button from "@/components/Button";
import moment from "moment";
import { checkIfOpen } from "@/utils/ConstantFunctions";

type BannerProfileSectionProps = {
  name: string;
  image: string;
  compressedImage: string;
  countryCode: string;
  phoneNumber: string;
  openTime: string;
  closeTime: string;
  travelTime: {
    min: number;
    max: number;
  };
  address: string;
  deliveryFee: number;
};

const BannerProfileSection: FC<BannerProfileSectionProps> = ({
  name,
  image,
  compressedImage,
  countryCode,
  phoneNumber,
  address,
  openTime,
  closeTime,
  deliveryFee,
}) => {
  const handleContactStore = () => {
    window.location.href = `tel:${countryCode}${phoneNumber}`;
  };
  const formattedOpenTime = moment(openTime).format("hh:mm A");
  const formattedCloseTime = moment(closeTime).format("hh:mm A");

  return (
    <section
      className="flex flex-wrap flex-col sm:flex-row gap-2 sm:gap-5 border-b border-zinc-700 pb-4"
      aria-label={`Store profile section for ${name}`}
    >
      <LazyLoadedImageComponent
        image={image}
        alt={`Image of ${name}`}
        compressedImage={compressedImage}
        className="w-full sm:w-1/3 rounded-lg"
      />
      <section
        className="flex flex-col gap-3 xl:gap-4"
        role="region"
        aria-labelledby="store-details"
      >
        <section
          className="flex gap-3 items-center"
          role="heading"
          aria-level={2}
        >
          <h2 id="store-details" className="text-2xl xl:text-5xl font-semibold">
            {name}
          </h2>
          {!checkIfOpen(openTime, closeTime) && (
            <section
              className="text-orange-300 flex items-center gap-1"
              aria-label="Closed"
            >
              <IoMoonSharp />
              <p className="text-[1rem] font-semibold flex-col">Closed</p>
            </section>
          )}
        </section>

        <section
          className="flex gap-2 items-center text-zinc-300"
          role="region"
          aria-labelledby="store-address"
        >
          <FaLocationDot aria-hidden="true" />
          <p id="store-address" className="text-sm xl:text-[0.9rem]">
            {address}
          </p>
        </section>
        <Button
          className="bg-green-700 rounded-lg w-fit text-[0.9rem] flex gap-1"
          onClick={handleContactStore}
          aria-label={`Contact store at ${countryCode}${phoneNumber}`}
        >
          <IoMdCall className="h-4 w-4" aria-hidden="true" />
          Contact Store
        </Button>
        <section
          className="flex gap-2 items-center"
          role="region"
          aria-labelledby="store-timing"
        >
          <section className="flex gap-2 items-center">
            <IoTimeOutline aria-hidden="true" />
            <p id="store-timing">
              {formattedOpenTime} - {formattedCloseTime}
            </p>
          </section>
          <span
            className="bg-white h-1 w-1 rounded-full"
            aria-hidden="true"
          ></span>
          <p
            className={`${deliveryFee === 0 && "text-yellow-700"}`}
            aria-label={`Delivery fee ${
              deliveryFee === 0 ? "free" : `$${deliveryFee}`
            }`}
          >
            ${deliveryFee} Delivery Fee
          </p>
        </section>
      </section>
    </section>
  );
};

export default BannerProfileSection;
