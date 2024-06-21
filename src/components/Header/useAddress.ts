import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddressQuery } from "@/redux/slice/api/user/addressSlice";
import { BROWSER_ROUTE } from "@/utils/Endpoints";

const useAddress = () => {
  const location = useLocation();
  const path = location.pathname;
  const isManageAddressPage = path.includes(BROWSER_ROUTE.MANAGE_ADDRESS);
  const navigate = useNavigate();
  const { data: address } = useAddressQuery("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const defaultAddress = address?.data?.find(
    (item: any) => item.isDefault === true
  );

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleHideDropdown = () => {
    if (!isButtonClicked) {
      setShowDropdown(false);
    }
    setIsButtonClicked(false);
  };

  const changeAddress = () => {
    setShowDropdown(false);
    navigate(BROWSER_ROUTE.MANAGE_ADDRESS);
  };

  return {
    defaultAddress,
    showDropdown,
    handleShowDropdown,
    handleHideDropdown,
    changeAddress,
    setIsButtonClicked,
    isManageAddressPage,
  };
};

export default useAddress;
