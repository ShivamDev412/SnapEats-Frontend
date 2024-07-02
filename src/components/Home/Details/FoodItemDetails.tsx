import Button from "@/components/Button";
import RadioButton from "@/components/InputComponent/RadioButton";
import LazyLoadedImageComponent from "@/components/LazyLoadedImageComponent";
import { MenuItemsType } from "@/redux/slice/api/user/homeSlice";
import { FC } from "react";
import { BiFoodTag } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";
import useFoodItemDetails from "./useFoodItemDetails";

const FoodItemDetails: FC<{ modelItem: MenuItemsType }> = ({ modelItem }) => {
  const {
    name,
    image,
    compressedImage,
    price,
    description,
    // id,
    isVeg,
    prepTime,
    options,
  } = modelItem;
  const {
    selectedChoices,
    isRequiredChoiceSelected,
    totalPrice,
    handleChoiceChange,
  } = useFoodItemDetails(price, options);
  return (
    <div className="flex gap-4">
      {modelItem && Object.keys(modelItem)?.length > 0 && (
        <>
          <LazyLoadedImageComponent
            image={image || ""}
            alt={name}
            compressedImage={compressedImage || ""}
            className="w-5/12 h-fit rounded-lg"
          />
          <div className="gap-2 flex flex-col">
            <h2 className="text-3xl font-semibold">{name}</h2>
            <p className="text-lg text-zinc-700">{description}</p>
            <div className="flex gap-2 items-center">
              <p className="text-[1.2rem] font-bold text-green-700">
                ${price.toFixed(2)}
              </p>
              <span className="bg-zinc-950 h-1 w-1 rounded-full"></span>
              <BiFoodTag
                className={`${
                  isVeg ? "fill-green-700" : "fill-red-700"
                } h-6 w-6`}
              />
              <span className="bg-zinc-950 h-1 w-1 rounded-full"></span>
              <p className="flex gap-1 items-center text-[1.2rem]">
                <FaRegClock className="h-4 w-4" /> {prepTime.toFixed(2)} min
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Additional Options</h3>
              {options.length &&
                options?.map((option) => (
                  <div className="flex flex-col w-full my-2" key={option.id}>
                    <div className="flex gap-2 items-center w-full">
                      <p className="text-lg font-semibold">
                        {option.option.name}
                      </p>
                      {option.isRequired && (
                        <p className="text-sm border rounded-[25px] px-[5px] py-[2px] border-zinc-300 font-medium text-zinc-900 bg-zinc-300">
                          Required
                        </p>
                      )}
                    </div>
                    {option?.choices?.length &&
                      option?.choices?.map((choice) => (
                        <div
                          className="flex gap-2 w-full ml-2 items-center my-2"
                          key={choice.id}
                        >
                          <RadioButton
                            name={option.id}
                            id={choice.id}
                            ariaLabel={
                              choice.predefinedChoice
                                ? choice.predefinedChoice.name
                                : choice.customChoice || ""
                            }
                            checked={selectedChoices[option.id] === choice.id}
                            onChange={() =>
                              handleChoiceChange(
                                option.id,
                                choice.id,
                                choice.additionalPrice || 0
                              )
                            }
                          />
                          <p className="text-[1rem]">
                            {choice?.predefinedChoice
                              ? choice.predefinedChoice.name
                              : choice.customChoice}
                          </p>
                          <p className="text-[1rem] font-semibold">
                            ${choice.additionalPrice?.toFixed(2)}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
            <Button disabled={!isRequiredChoiceSelected}>
              Add 1 of ${totalPrice.toFixed(2)} to cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodItemDetails;
