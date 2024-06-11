import { useState } from "react";

const useMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState("add");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleMenuItem = (action: string) => {
    if (action === "add") {
      handleOpenModal();
    } else {
    }
    setActionType(action);
  };
  return {
    handleMenuItem,
    openModal,
    handleOpenModal,
    handleCloseModal,
    actionType,
  };
};
export default useMenu;
