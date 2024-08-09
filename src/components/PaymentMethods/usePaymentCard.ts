import { useDeletePaymentMethodMutation, useSetDefaultPaymentMethodMutation } from "@/redux/slice/api/user/paymentSlice";
import { setLoading } from "@/redux/slice/loadingSlice";
import { useDispatch } from "react-redux";
import  Toast  from "@/utils/Toast";

const usePaymentCard = () => {
    const dispatch = useDispatch();
    const [deleteCard] = useDeletePaymentMethodMutation();
    const [setAsDefault] = useSetDefaultPaymentMethodMutation();
    const handelSetDefaultPaymentMethod = async (paymentMethodId: string) => {
      try {
        dispatch(setLoading(true));
        const res = await setAsDefault(paymentMethodId).unwrap();
        if (res.success) {
          dispatch(setLoading(false));
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch(setLoading(false));
        Toast(error.data.message, "error");
      }
    };
    const handleDelete = async (paymentMethodId: string) => {
      try {
        dispatch(setLoading(true));
        const res = await deleteCard(paymentMethodId).unwrap();
        if (res.success) {
          dispatch(setLoading(false));
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch(setLoading(false));
        Toast(error.data.message, "error");
      }
    };
    return {
      handelSetDefaultPaymentMethod,
      handleDelete,
    };
};
export default usePaymentCard;