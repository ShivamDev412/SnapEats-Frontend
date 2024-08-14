import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { FoodType, useGetAllFoodTypesQuery } from "@/redux/slice/api/store/profileSlice";
import { setFoodType } from "@/redux/slice/searchSlice";

export interface CategoryDataType extends FoodType {
  isSelected: boolean;
}

const useCategories = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
  const { foodType } = useSelector((state: RootState) => state.search);
  const { data: categories, isFetching } = useGetAllFoodTypesQuery("");
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (categories?.data) {
      const updatedCategoryData = categories.data.map((item) => ({
        ...item,
        isSelected: item.foodType === foodType,
      }));
      setCategoryData(updatedCategoryData);
    }
  }, [categories, foodType, setCategoryData]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scroll = scrollContainerRef.current;
      
      setTimeout(() => {
        handleScroll();
      }, 0);

      scroll.addEventListener("scroll", handleScroll);
      return () => scroll?.removeEventListener("scroll", handleScroll);
    }
  }, [categoryData]);

  const handleSetFoodType = (id: string) => {
    if (foodType === id) dispatch(setFoodType(""));
    else dispatch(setFoodType(id));
  };

  return {
    categories,
    isFetching,
    scrollContainerRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight,
    setFoodType: handleSetFoodType,
    categoryData,
  };
};

export default useCategories;
