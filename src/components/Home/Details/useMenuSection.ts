import { MenuItemsType } from "@/redux/slice/api/user/homeSlice";
import { useState } from "react";

const useMenuSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modelItem, setModelItem] = useState<MenuItemsType>();
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (menuItem: MenuItemsType) => {
    setModelItem(menuItem);
    setOpenModal(true);
  };
  const handleAddToCart = (e: any, item: MenuItemsType) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.options.some((option) => option.isRequired)) {
      handleOpenModal(item);
    }
  };
  return {
    openModal,
    handleCloseModal,
    handleOpenModal,
    handleAddToCart,
    modelItem,
  };
};
export default useMenuSection;
