import { useState } from "react";

const useProfileMainDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const verifyEmail = () => setOpenModal(true);
  return {
    openModal,
    handleCloseModal,
    verifyEmail,
  };
};
export default useProfileMainDetails;
