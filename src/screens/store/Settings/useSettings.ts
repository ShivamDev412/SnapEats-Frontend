import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountType } from "@/redux/slice/accountSlice";
import useAccountType from "@/Hooks/useAccountType";
import { useTranslation } from "react-i18next";
import { useChangeLanguageMutation } from "@/redux/slice/api/user/settingsSlice";
import Toast from "@/utils/Toast";
import { useUserQuery } from "@/redux/slice/api/user/profileSlice";
const useSettings = () => {
  const { data: user } = useUserQuery("");
  const { language } = { ...user?.data };
  const [changeLanguage] = useChangeLanguageMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isUser = useAccountType();
  const { i18n } = useTranslation();
  const handleSelectedLanguage = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const res = await changeLanguage(e.target.value).unwrap();
      if (res.success) {
        i18n.changeLanguage(e.target.value);
        Toast(res.message, "success");
      }
    } catch (e: any) {
      Toast(e.message, "error");
    }
  };
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

  return {
    handleEditProfile,
    switchAccount,
    location,
    isUser,
    language,
    handleSelectedLanguage,
  };
};
export default useSettings;
