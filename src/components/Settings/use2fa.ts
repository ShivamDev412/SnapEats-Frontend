import { useEffect, useState } from "react";
import {
  useDisable2FAMutation,
  useEnable2FAMutation,
  useGet2FAStatusQuery,
} from "@/redux/slice/api/user/2faSlice";
import Toast from "@/utils/Toast";
import { set2FAEnabled, setQrCode } from "@/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

const use2FA = () => {
  const { qrCode, is2FAEnabled } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const { data } = useGet2FAStatusQuery("");
  const [openModal, setOpenModal] = useState(false);
  const [enable2Fa] = useEnable2FAMutation();
  const [disable2Fa] = useDisable2FAMutation();
  useEffect(() => {
    if (data?.success && data.data) {
      dispatch(set2FAEnabled(data.data.twoFactorStatus));
    }
  }, [data, dispatch]);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleToggle2FA = async (checked: boolean) => {
    try {
      const res = checked
        ? await enable2Fa().unwrap()
        : await disable2Fa().unwrap();
      if (res.success) {
        if (checked) {
          dispatch(setQrCode(res.data?.qrCode));
          setOpenModal(true);
          dispatch(set2FAEnabled(true));
        } else {
          dispatch(setQrCode(null));
          dispatch(set2FAEnabled(false));
        }

        Toast(res.message, "success");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      Toast(e.data.message, "error");
    }
  };

  return {
    is2FAEnabled,
    handleToggle2FA,
    qrCode,
    openModal,
    handleCloseModal,
  };
};

export default use2FA;
