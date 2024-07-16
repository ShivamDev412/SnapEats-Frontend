import useFormHandler from "@/Hooks/useFormHandler";
import {
  BankAccountType,
  useAddBankAccountMutation,
} from "@/redux/slice/api/store/paymentSlice";
import { StoreBankAccountSchema } from "@/Schema/Store.Schema";
import { DEFAULT_VALUES } from "@/utils/Constants";
import Toast from "@/utils/Toast";

const useAddNewAccount = (handleCloseModal: () => void) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    setError,
  } = useFormHandler<BankAccountType>(
    DEFAULT_VALUES.BANK_ACCOUNT,
    StoreBankAccountSchema
  );
  const [linkBankAccount, { isLoading }] = useAddBankAccountMutation();
  const onSubmit = async (data: BankAccountType) => {
    try {
      const res = await linkBankAccount(data).unwrap();
      if (res.success) {
        handleCloseModal();
        reset();
        clearErrors();
        Toast(res.message, "success");
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    setError,
    isLoading,
  };
};
export default useAddNewAccount;
