import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountType } from "@/redux/slice/accountSlice";
import useAccountType from "@/Hooks/useAccountType";
import { useTranslation } from "react-i18next";
import { useChangeLanguageMutation } from "@/redux/slice/api/user/settingsSlice";
import Toast from "@/utils/Toast";
import { useUserQuery } from "@/redux/slice/api/user/profileSlice";
import { useState } from "react";
import {  set2FAVerified } from "@/redux/slice/authSlice";
import {
  useGet2FAStatusQuery,
  useVerify2FAMutation,
} from "@/redux/slice/api/user/2faSlice";

const useSettings = () => {
  const { data: user } = useUserQuery("");
  const { language } = { ...user?.data };
  const [verify2FAModal, setVerify2FAModal] = useState(false);
  const [token, setToken] = useState("");
  const [verify2Fa] = useVerify2FAMutation();
  const [changeLanguage] = useChangeLanguageMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isUser = useAccountType();
  const { i18n } = useTranslation();
  const { data: twoFAStatus } = useGet2FAStatusQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const handleModalClose = () => {
    setVerify2FAModal(false);
  };
  const handleModalOpen = () => {
    setVerify2FAModal(true);
  };
  const handleSelectedLanguage = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const res = await changeLanguage(e.target.value).unwrap();
      if (res.success) {
        i18n.changeLanguage(e.target.value);
        Toast(res.message, "success");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      if (twoFAStatus?.data?.twoFactorStatus && !twoFAStatus?.success)
        handleModalOpen();
      else {
        dispatch(setAccountType("USER"));
        navigate(BROWSER_ROUTE.HOME);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await verify2Fa({
        token,
      }).unwrap();
      if (res.success) {
        dispatch(setAccountType("USER"));
        navigate(BROWSER_ROUTE.HOME);
        dispatch(set2FAVerified(true));
        handleModalClose();
        Toast(res.message, "success");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      Toast(e.data.message, "error");
    }
  };
  return {
    handleEditProfile,
    switchAccount,
    location,
    isUser,
    language,
    handleSelectedLanguage,
    verify2FAModal,
    handleModalClose,
    token,
    setToken,
    handleVerifyCode,
  };
};
export default useSettings;
