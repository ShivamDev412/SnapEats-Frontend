import { RootState } from "@/redux/Store";
import { useStoreMenuItemsQuery } from "@/redux/slice/api/store/menuSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const useMenuItems = () => {
  const { selectedCategory } = useSelector((state: RootState) => state.store);
  const [search, setSearch] = useState("");
  const generateQuery = () => {
    let query = "";

    if (selectedCategory !== "all") {
      query += `?category=${selectedCategory}`;
    }

    if (search) {
      query += query ? `&search=${search}` : `?search=${search}`;
    }

    return query;
  };
  const { data: menuItems, isFetching } = useStoreMenuItemsQuery(
    generateQuery()
  );
  return {
    menuItems,
    isFetching,
    setSearch,
  };
};
export default useMenuItems;
