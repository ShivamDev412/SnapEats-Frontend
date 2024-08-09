import Button from "@/components/Button";
import {
  OrderSummary,
  DeliveryInformation,
  PaymentInformation,
} from "@/components/Checkout";
import useCheckout from "./useCheckout";
import { useTranslation } from "react-i18next";
//skeleton
import CheckoutSkeleton from "@/components/Skeleton/CheckoutSkeleton";
const Checkout = () => {
  const {
    isCheckoutEnabled,
    defaultAddress,
    defaultPaymentMethod,
    handleCheckout,
    orderSummary,
    isPlacingOrderLoading,
    isLoading,
  } = useCheckout();
  const { t } = useTranslation();
  if (isLoading) return <CheckoutSkeleton />;
  return (
    <section className="flex flex-col w-full text-zinc-100 gap-4 justify-center items-center">
      <h2 className="text-3xl font-semibold w-full">{t("checkout")}</h2>
      {orderSummary?.data && <OrderSummary orderSummary={orderSummary?.data} />}
      <DeliveryInformation defaultAddress={defaultAddress} />
      <PaymentInformation defaultPaymentMethod={defaultPaymentMethod} />
      <Button
        className="w-full sm:w-1/3"
        disabled={!isCheckoutEnabled}
        onClick={handleCheckout}
        isLoading={isPlacingOrderLoading}
      >
        {t("placeOrder")}
      </Button>
    </section>
  );
};

export default Checkout;
