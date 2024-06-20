import useDebounce from "@/Hooks/useDebounce";
import { RootState } from "@/redux/Store";
import { useStoreMenuItemsQuery } from "@/redux/slice/api/store/menuSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useMenuItems = (searchValue: string) => {
  const { selectedCategory } = useSelector((state: RootState) => state.store);
  const debouncedSearchTerm = useDebounce(searchValue);
  const [query, setQuery] = useState<string>("");

  const generateQuery = () => {
    let query = "";
    if (selectedCategory !== "all") {
      query += `?category=${selectedCategory}`;
    }
    if (debouncedSearchTerm) {
      query += query
        ? `&search=${debouncedSearchTerm}`
        : `?search=${debouncedSearchTerm}`;
    }
    return query;
  };

  useEffect(() => {
    setQuery(generateQuery());
  }, [debouncedSearchTerm, selectedCategory]);

  const { data: menuItems, isFetching } = useStoreMenuItemsQuery(query);

  return {
    menuItems,
    isFetching,
  };
};

export default useMenuItems;
