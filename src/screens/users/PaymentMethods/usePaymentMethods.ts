import {
  useGetPaymentMethodsQuery,
} from "@/redux/slice/api/user/paymentSlice";

import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUNISHABLE_KEY as string
);
const usePaymentMethod = () => {
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
