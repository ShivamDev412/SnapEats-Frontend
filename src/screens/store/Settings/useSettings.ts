import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountType } from "@/redux/slice/accountSlice";
import useAccountType from "@/Hooks/useAccountType";
const useSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isUser = useAccountType();
  const handleEditProfile = () => {
    navigate(BROWSER_ROUTE.STORE_PROFILE);
  };
  const switchAccount = () => {
    if (isUser) {
      dispatch(setAccountType("STORE"));
      navigate(BROWSER_ROUTE.STORE_DASHBOARD);
    } else {
      dispatch(setAccountType("USER"));
      navigate(BROWSER_ROUTE.HOME);
    }
  };
  return { handleEditProfile, switchAccount, location, isUser };
};
export default useSettings;
