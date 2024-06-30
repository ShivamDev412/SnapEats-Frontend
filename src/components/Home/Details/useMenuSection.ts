import { MenuItemsType } from "@/redux/slice/api/user/homeSlice";
import { useState } from "react";

const useMenuSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (menuItem: MenuItemsType) => {
    setOpenModal(true);
  };
  const handleAddToCart = (
    e: any,
    item: MenuItemsType
  ) => {
    e.stopPropagation();
    console.log(item);
  };
  return {
    openModal,
    handleCloseModal,
    handleOpenModal,
    handleAddToCart,
  };
};
export default useMenuSection;
