import { IoAdd, IoClose } from "react-icons/io5";
import useFoodTypes from "./useFoodTypes";
import { FC, useEffect, useState } from "react";
import { FoodType } from "@/redux/slice/api/store/profileSlice";

const FoodTypes: FC<{
  foodType: FoodType[];
  foodTypesFetching: boolean;
  type: "selectedFoodTypes" | "foodTypes";
  handleFoodType: (
    foodType: FoodType,
    type: "selectedFoodTypes" | "foodTypes"
  ) => void;
}> = ({ foodType, foodTypesFetching, type, handleFoodType }) => {
  if (foodTypesFetching) return <div>Loading...</div>;
  return (
    <ul className="flex flex-wrap gap-2">
      {foodType?.map((foodType) => (
        <li
          key={foodType.id}
          className={`border rounded-[25px] hover:bg-primary hover:border-primary transition-colors duration-300 ease-in-out ${
            type === "selectedFoodTypes"
              ? "bg-primary border-primary"
              : "border-zinc-700"
          }`}
        >
          <button
            className="px-4 py-2 flex items-center gap-1 text-zinc-100"
            onClick={() => handleFoodType(foodType, type)}
          >
            {foodType.foodType}{" "}
            {type === "selectedFoodTypes" ? <IoClose /> : <IoAdd />}
          </button>
        </li>
      ))}
    </ul>
  );
};
const StoreFoodTypes = () => {
  const {
    storeFoodTypesFetching,
    foodTypesFetching,
    handleFoodType,
    foodTypes,
    storeFoodTypes,
  } = useFoodTypes();
  const [foodTypesData, selectedFoodTypesData] = useState<FoodType[]>([]);
  useEffect(() => {
    selectedFoodTypesData(
      foodTypes?.data?.filter(
        (foodType) =>
          !storeFoodTypes?.data?.find(
            (storeFoodType) => storeFoodType.id === foodType.id
          )
      ) || []
    );
  }, [foodTypes?.data, storeFoodTypes]);

  return (
    <section className="flex flex-col gap-2 md:gap-6">
      <h3 className="text-lg lg:text-xl font-bold">Food Types</h3>

      <FoodTypes
        foodType={storeFoodTypes?.data || []}
        foodTypesFetching={storeFoodTypesFetching}
        type="selectedFoodTypes"
        handleFoodType={handleFoodType}
      />

      <FoodTypes
        foodType={foodTypesData}
        foodTypesFetching={foodTypesFetching}
        type="foodTypes"
        handleFoodType={handleFoodType}
      />
    </section>
  );
};

export default StoreFoodTypes;
