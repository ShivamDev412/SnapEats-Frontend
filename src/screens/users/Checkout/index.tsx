import Button from "@/components/Button";
import {
  OrderSummary,
  DeliveryInformation,
  PaymentInformation,
} from "@/components/Checkout";
import useCheckout from "./useCheckout";
const Checkout = () => {
  const { isCheckoutEnabled, defaultAddress, defaultPaymentMethod } =
    useCheckout();
  return (
    <section className="flex flex-col w-full text-zinc-100 gap-4 justify-center items-center">
      <h2 className="text-3xl font-semibold w-full">Checkout</h2>
      <OrderSummary />
      <DeliveryInformation defaultAddress={defaultAddress}/>
      <PaymentInformation defaultPaymentMethod={defaultPaymentMethod}/>
      <Button className="w-full sm:w-1/3" disabled={!isCheckoutEnabled}>
        Place Order
      </Button>
    </section>
  );
};

export default Checkout;
