import useDeviceType from "@/Hooks/useDeviceType";
import { setAccountType } from "@/redux/slice/accountSlice";
import { useLazyGetOrdersLiveStatusQuery } from "@/redux/slice/api/user/orderSlice";
import { setCredentials } from "@/redux/slice/authSlice";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useDeviceType();
  const [trigger] = useLazyGetOrdersLiveStatusQuery();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const isStoreRegistered = query.get("isStoreRegistered");

    if (token) {
      dispatch(setCredentials(token));
      trigger();
      if (isStoreRegistered && !isMobile) {
        dispatch(setAccountType("STORE"));
        navigate(BROWSER_ROUTE.STORE_DASHBOARD);
      } else navigate(BROWSER_ROUTE.HOME);
    }
  }, [location, history]);

  return <section className="w-full">
    
  </section>;
};

export default SuccessPage;
