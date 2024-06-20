import { useMenuCategoriesQuery } from "@/redux/slice/api/store/menuSlice";
import { useState } from "react";

const useMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [actionType, setActionType] = useState("add");
  const { data: categories, isFetching } = useMenuCategoriesQuery("");
  return {
    categories,
    isFetching,
    showModal,
    setShowModal,
    actionType,
    setActionType,
    searchValue,
    setSearchValue,
  };
};

export default useMenu;
