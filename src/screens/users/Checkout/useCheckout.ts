import { useAddressQuery } from "@/redux/slice/api/user/addressSlice";
import { useGetPaymentMethodsQuery } from "@/redux/slice/api/user/paymentSlice";
import { useEffect, useState } from "react";

const useCheckout = () => {
  const [isCheckoutEnabled, setIsCheckoutEnabled] = useState(false);
  const { data: address } = useAddressQuery("");
  const defaultAddress = address?.data?.find(
    (item: any) => item.isDefault === true
  );
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const defaultPaymentMethod = paymentMethods?.data?.paymentMethods?.data?.find(
    (method) => method.id === paymentMethods?.data?.defaultPaymentMethod
  );
  useEffect(() => {
    if (defaultAddress && defaultPaymentMethod) {
      setIsCheckoutEnabled(true);
    } else {
      setIsCheckoutEnabled(false);
    }
  }, [defaultAddress, defaultPaymentMethod]);
  return {
    isCheckoutEnabled,
    defaultAddress,
    defaultPaymentMethod,
  };
};
export default useCheckout;
