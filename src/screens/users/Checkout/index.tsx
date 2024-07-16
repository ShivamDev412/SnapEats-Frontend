import Button from "@/components/Button";
import {
  OrderSummary,
  DeliveryInformation,
  PaymentInformation,
} from "@/components/Checkout";
import useCheckout from "./useCheckout";
import { useTranslation } from "react-i18next";
const Checkout = () => {
  const { isCheckoutEnabled, defaultAddress, defaultPaymentMethod } =
    useCheckout();
  const { t } = useTranslation();
  return (
    <section className="flex flex-col w-full text-zinc-100 gap-4 justify-center items-center">
      <h2 className="text-3xl font-semibold w-full">{t('checkout')}</h2>
      <OrderSummary />
      <DeliveryInformation defaultAddress={defaultAddress} />
      <PaymentInformation defaultPaymentMethod={defaultPaymentMethod} />
      <Button className="w-full sm:w-1/3" disabled={!isCheckoutEnabled}>
        {t("placeOrder")}
      </Button>
    </section>
  );
};

export default Checkout;
