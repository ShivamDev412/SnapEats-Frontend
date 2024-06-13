import { useState } from "react";
const useMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState<"add" | "edit">("add");
  const handleMenuItem = (type: "add" | "edit") => {
    setActionType(type);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return {
    handleMenuItem,
    openModal,
    handleCloseModal,
    actionType,
  };
};

export default useMenu;
