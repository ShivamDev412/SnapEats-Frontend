import {
  CategoryType,
  useGetStoreDetailQuery,
} from "@/redux/slice/api/user/homeSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const useDetails = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data: storeDetails, isFetching } = useGetStoreDetailQuery(path);
  const [categoryData, setCategory] = useState<
    { id: string; name: string; isActive: boolean }[]
  >([]);
  const { menuItems } = storeDetails?.data || {};
  useEffect(() => {
    if (menuItems)
      setCategory(
        menuItems
          ?.map((item) => {
            return {
              id: item.category.id,
              name: item.category.name,
              isActive: false,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name))
      );
  }, [menuItems]);
  const handleCategoryClick = (category: CategoryType) => {
    setCategory(
      categoryData.map((item) => {
        return {
          ...item,
          isActive: item.id === category.id,
        };
      })
    );
  };
  return { storeDetails, isFetching, handleCategoryClick, categoryData };
};
export default useDetails;
