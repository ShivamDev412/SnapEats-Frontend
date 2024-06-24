import { useRef, useState, useEffect } from 'react';
import { useGetAllFoodTypesQuery } from "@/redux/slice/api/store/profileSlice";

const useCategories = () => {
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
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      handleScroll();
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      return () => scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [categories]);

  return {
    categories,
    isFetching,
    scrollContainerRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight,
  };
};

export default useCategories;
