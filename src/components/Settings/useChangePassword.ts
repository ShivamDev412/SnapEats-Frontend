import { useState } from "react";

const useChangePassword = () => {
  const [showModal, setShoeModal] = useState(false);
  const handleCloseModal = () => {
    setShoeModal(false);
  };
  const changePassword = () => {
    setShoeModal(true);
  };
  return {
    showModal,
    handleCloseModal,
    changePassword,
  };
};
export default useChangePassword;
