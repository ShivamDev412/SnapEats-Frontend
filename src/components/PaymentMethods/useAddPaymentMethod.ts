import useFormHandler from "@/Hooks/useFormHandler";
import { NewPaymentMethodSchema } from "@/Schema/UserSchema";
import { DEFAULT_VALUES } from "@/utils/Constants";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useAddNewPaymentMethodMutation } from "@/redux/slice/api/user/paymentSlice";
import Toast from "@/utils/Toast";

export type NewPaymentMethodType = {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const useAddPaymentMethod = (handleCloseModal: () => void) => {
  const stripe = useStripe();
  const elements = useElements();
  type FormField = z.infer<typeof NewPaymentMethodSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
    setError,
  } = useFormHandler<NewPaymentMethodType>(
    DEFAULT_VALUES.PAYMENT_METHOD,
    NewPaymentMethodSchema
  );
  const handleCardError = (code: string) => {
    switch (code) {
      case "incomplete_number":
        setError("cardNumber", {
          message: "Please enter a valid card number",
        });
        break;
      case "invalid_number":
        setError("cardNumber", {
          message: "Please enter a valid card number",
        });
        break;
      case "incomplete_cvc":
        setError("cvv", {
          message: "Please enter a valid CVV",
        });
        break;
      case "invalid_cvc":
        setError("cvv", {
          message: "Please enter a valid CVV",
        });
        break;
      case "incomplete_expiry":
        setError("expiryDate", {
          message: "Please enter a valid expiry date",
        });
        break;
      case "invalid_expiry":
        setError("expiryDate", {
          message: "Please enter a valid expiry date",
        });
    }
  };
  const [addPaymentCard, { isLoading }] = useAddNewPaymentMethodMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: { name: credentials.name },
    });
    if (error) handleCardError(error.code!);
    else {
      try {
        const res = await addPaymentCard({
          name: credentials.name,
          paymentMethodId: paymentMethod?.id,
        }).unwrap();
        if (res.success) {
          handleCloseModal();
          Toast(res.message, "success");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        Toast(error?.data.message || "Something went wrong", "error");
      }
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    errors,
    setError,
    onSubmit,
    isLoading,
  };
};

export default useAddPaymentMethod;
