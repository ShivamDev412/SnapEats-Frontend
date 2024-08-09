import React, { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useCategories, { CategoryDataType } from "./useCategories";
import StoreCategoriesSkeleton from "@/components/Skeleton/StoreCategoriesSkeleton";
import { IconType } from "react-icons";

const CategoriesItem: React.FC<{
  category: CategoryDataType;
  setFoodType: (id: string) => void;
}> = ({ category, setFoodType }) => {
  return (
    <li
      className={`px-2  text-sm xl:text-lg border  font-semibold text-zinc-100 flex justify-center rounded-[25px] items-center text-nowrap hover:bg-primary hover:border-primary transition-all ${
        category.isSelected
          ? "bg-primary border-primary"
          : "bg-zinc-950 border-zinc-600"
      }`}
    >
      <button
        className="p-2"
        type="button"
        aria-label={`Select ${category.foodType}`}
        onClick={() => setFoodType(category.foodType)}
      >
        {category.foodType}
      </button>
    </li>
  );
};
const ArrowButton: FC<{
  ariaLabel: string;
  onClick: () => void;
  icon: IconType;
}> = ({ ariaLabel, onClick, icon: Icon }) => {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      className="p-2 bg-zinc-700 text-white rounded-full"
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
const Categories = () => {
  const {
    categoryData,
    isFetching,
    scrollContainerRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight,
    setFoodType,
  } = useCategories();

  if (isFetching) {
    return (
      <>
        <div className="block sm:hidden">
          <StoreCategoriesSkeleton count={3} />
        </div>
        <div className="hidden sm:block md:hidden">
          <StoreCategoriesSkeleton count={6} />
        </div>
        <div className="hidden md:block lg:hidden">
          <StoreCategoriesSkeleton count={6} />
        </div>
        <div className="hidden lg:block">
          <StoreCategoriesSkeleton count={8} />
        </div>
      </>
    );
  }

  return (
    <div className="relative flex items-center">
      {showLeftArrow && (
        <ArrowButton
          ariaLabel="scroll left"
          onClick={scrollLeft}
          icon={FaArrowLeft}
        />
      )}
      <ul
        ref={scrollContainerRef}
        className="flex gap-2 overflow-scroll sm:overflow-hidden overflow-y-hidden scroll-smooth custom-scrollbar"
      >
        {categoryData?.map((category) => (
          <CategoriesItem
            key={category.id}
            category={category}
            setFoodType={setFoodType}
          />
        ))}
      </ul>
      {showRightArrow && (
        <ArrowButton
          ariaLabel="scroll rtigh"
          onClick={scrollRight}
          icon={FaArrowRight}
        />
      )}
    </div>
  );
};

export default Categories;
