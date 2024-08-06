import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useCategories from "./useCategories";
import { FoodType } from "@/redux/slice/api/store/profileSlice";
import StoreCategoriesSkeleton from "@/components/Skeleton/StoreCategoriesSkeleton";

const CategoriesItem: React.FC<{ category: FoodType }> = ({ category }) => {
  return (
    <li className="px-2 bg-zinc-950 text-sm xl:text-lg border border-zinc-600 font-semibold text-zinc-100 flex justify-center rounded-[25px] items-center text-nowrap hover:bg-primary hover:border-primary transition-all">
      <button className="p-2">{category.foodType}</button>
    </li>
  );
};

const Categories = () => {
  const {
    categories,
    isFetching,
    scrollContainerRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight,
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
        <button
          aria-label="scroll left"
          type="button"
          className="hidden sm:block absolute left-0 p-2 bg-zinc-700 text-white rounded-full"
          onClick={scrollLeft}
        >
          <FaArrowLeft />
        </button>
      )}
      <ul
        ref={scrollContainerRef}
        className="flex gap-2 overflow-scroll sm:overflow-hidden overflow-y-hidden scroll-smooth custom-scrollbar"
      >
        {categories?.data?.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
      </ul>
      {showRightArrow && (
        <button
          aria-label="scroll right"
          type="button"
          className="hidden sm:block absolute right-0 p-2 bg-zinc-700 text-white rounded-full"
          onClick={scrollRight}
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Categories;
