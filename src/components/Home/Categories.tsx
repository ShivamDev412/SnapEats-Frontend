import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useCategories from "./useCategories";
import { FoodType } from "@/redux/slice/api/store/profileSlice";

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

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="relative flex items-center">
      {showLeftArrow && (
        <button className="hidden xl:block absolute left-0 p-2 bg-zinc-700 text-white rounded-full" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
      )}
      <ul
        ref={scrollContainerRef}
        className="flex gap-2 overflow-scroll xl:overflow-hidden overflow-y-hidden scroll-smooth custom-scrollbar"
      >
        {categories?.data?.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
      </ul>
      {showRightArrow && (
        <button className="hidden xl:block absolute right-0 p-2 bg-zinc-700 text-white rounded-full" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Categories;
