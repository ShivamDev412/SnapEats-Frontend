import { useAddressQuery } from "@/redux/slice/api/user/addressSlice";
import {
  useGetOrderSummaryQuery,
  usePlaceOrderMutation,
} from "@/redux/slice/api/user/checkoutSlice";
import { useGetPaymentMethodsQuery } from "@/redux/slice/api/user/paymentSlice";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useCheckout = () => {
  const navigation = useNavigate();
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
  const { data: orderSummary, isLoading } = useGetOrderSummaryQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const [placeOrder, { isLoading: isPlacingOrderLoading }] =
    usePlaceOrderMutation();
  const handleCheckout = async () => {
    if (isCheckoutEnabled && orderSummary?.data) {
      try {
        const res = await placeOrder({
          orderItems: orderSummary?.data?.orderSummary,
        }).unwrap();
        if (res.success) {
          Toast(res.message, "success");
          navigation(BROWSER_ROUTE.ORDERS)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return {
    isLoading,
    isCheckoutEnabled,
    defaultAddress,
    defaultPaymentMethod,
    handleCheckout,
    orderSummary,
    isPlacingOrderLoading,
  };
};
export default useCheckout;
