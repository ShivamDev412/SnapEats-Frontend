import {
  useGetBankAccountQuery,
  useUnlinkBankAccountMutation,
} from "@/redux/slice/api/store/paymentSlice";
import { setLoading } from "@/redux/slice/loadingSlice";
import Toast from "@/utils/Toast";
import { useState } from "react";
import { useDispatch } from "react-redux";

const usePayments = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };
  const { data: backAccount, isFetching } = useGetBankAccountQuery();
  const [unlinkAccount] = useUnlinkBankAccountMutation();
  const handleUnlinkAccount = async () => {
    try {
      dispatch(setLoading(true));
      const res = await unlinkAccount().unwrap();
      if (res.success) dispatch(setLoading(false));
    } catch (error: any) {
      Toast(error.data.message, "error");
      dispatch(setLoading(false));
    }
  };
  return {
    modal,
    handleOpenModal,
    handleCloseModal,
    setModal,
    backAccount,
    isFetching,
    handleUnlinkAccount,
  };
};
export default usePayments;
