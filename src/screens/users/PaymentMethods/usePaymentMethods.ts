import {
  useDeletePaymentMethodMutation,
  useGetPaymentMethodsQuery,
  useSetDefaultPaymentMethodMutation,
} from "@/redux/slice/api/user/paymentSlice";
import Toast from "@/utils/Toast";

import { Elements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { setLoading } from "@/redux/slice/loadingSlice";
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUNISHABLE_KEY as string
);
const usePaymentMethod = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const { data: paymentMethods } = useGetPaymentMethodsQuery();


  return {
    paymentMethods,
    Elements,
    stripePromise,
    CardElement,
    showModal,
    handleShowModal,
    handleCloseModal,
  };
};
export default usePaymentMethod;
