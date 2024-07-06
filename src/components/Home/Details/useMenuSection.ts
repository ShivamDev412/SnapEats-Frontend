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
  return {
    openModal,
    handleCloseModal,
    handleOpenModal,
    modelItem,
  
  };
};
export default useMenuSection;
