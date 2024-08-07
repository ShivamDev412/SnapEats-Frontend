import { RootState } from "@/redux/Store";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const useOrderStatusPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const { popUpOrderMessages } = useSelector(
    (state: RootState) => state.userOrder
  );
  useEffect(() => {
    if (path !== BROWSER_ROUTE.ORDERS) setIsVisible(true);
    else setIsVisible(false);
  }, [path]);
  return {
    popUpOrderMessages,
    isVisible,
  };
};
export default useOrderStatusPopUp;
