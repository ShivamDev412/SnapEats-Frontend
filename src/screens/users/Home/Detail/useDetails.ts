import {
  CategoryType,
  useGetStorePrimaryDetailsQuery,
  useGetStoreMenuCategoriesQuery,
  useGetStoreMenuItemsQuery,
} from "@/redux/slice/api/user/homeSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const useDetails = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data: storePrimaryDetails, isFetching } =
    useGetStorePrimaryDetailsQuery(path);
  const { data: getStoreMenuCategories } = useGetStoreMenuCategoriesQuery(path);
  const {data:menuItemsData} = useGetStoreMenuItemsQuery(path);
  const [categoryData, setCategory] = useState<
    { id: string; name: string; isActive: boolean }[]
  >([]);
  const menuItems = menuItemsData?.data || [];
  const categories = getStoreMenuCategories?.data || [];
  useEffect(() => {
    if (categories.length > 0)
      setCategory(
        categories
          .map((item) => ({
            id: item.id,
            name: item.name,
            isActive: false,
          }))
          .sort((a, b) => a.id.localeCompare(b.id))
      );
  }, [categories]);
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
  return {
    storePrimaryDetails,
    isFetching,
    handleCategoryClick,
    categoryData,
    categories,
    menuItems,
  };
};
export default useDetails;
