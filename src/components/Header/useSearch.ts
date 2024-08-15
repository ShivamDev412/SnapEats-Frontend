import {
  MostOrderedDataType,
  useGetMostOrderedItemsQuery,
} from "@/redux/slice/api/user/homeSlice";
import { useUserQuery } from "@/redux/slice/api/user/profileSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: user } = useUserQuery("");
  const userId = user?.data.id;
  const [showSearchDropdown, setSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<
    { name: string; url: string }[]
  >([]);

  useEffect(() => {
    if (userId) {
      const storedSearches = JSON.parse(
        localStorage.getItem(`recentSearches_${userId}`) || "[]"
      );
      setRecentSearches(storedSearches);
    }
  }, [userId]);

  const handleBlur = () => {
    setTimeout(() => {
      setSearchDropdown(false);
    }, 130);
  };

  const { data: mostOrderedData, isFetching } = useGetMostOrderedItemsQuery();

  const handleNavigation = (item: MostOrderedDataType) => {
    const url = `/${encodeURIComponent(item.storeName)}/${item.storeId}`;

    const newSearch = {
      name: item.name,
      url: url,
    };

    const updatedSearches = [
      newSearch,
      ...recentSearches.filter(
        (search: { name: string }) => search.name !== item.name
      ),
    ];

    if (updatedSearches.length > 5) {
      updatedSearches.pop();
    }

    localStorage.setItem(
      `recentSearches_${userId}`,
      JSON.stringify(updatedSearches)
    );
    setRecentSearches(updatedSearches);

    navigate(url);
    setSearchDropdown(false);
  };

  return {
    search,
    setSearch,
    showSearchDropdown,
    setSearchDropdown,
    handleBlur,
    mostOrderedData,
    isFetching,
    handleNavigation,
    recentSearches, // Expose recent searches
  };
};

export default useSearch;
