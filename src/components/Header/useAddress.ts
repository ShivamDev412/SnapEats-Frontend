import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AddressType,
  useAddressQuery,
} from "@/redux/slice/api/user/addressSlice";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { setCoords } from "@/redux/slice/searchSlice";

const useAddress = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const isManageAddressPage = path.includes(BROWSER_ROUTE.MANAGE_ADDRESS);
  const navigate = useNavigate();
  const { data: address } = useAddressQuery("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            dispatch(
              setCoords({
                lat: latitude,
                lon: longitude,
              })
            );
          },
          () => Toast("Unable to retrieve your location", "error")
        );
      } else {
        Toast("Geolocation not supported", "error");
      }
    };
    fetchCoordinates();
  }, [dispatch]);
  const defaultAddress = address?.data?.find(
    (item: AddressType) => item.isDefault === true
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
