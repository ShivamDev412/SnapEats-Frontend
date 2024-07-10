import { OrderSummary, DeliveryInformation } from "@/components/Checkout"
const Checkout = () => {
  return (
    <section className="flex flex-col w-full text-zinc-100 gap-4">
      <h2 className="text-3xl font-semibold">Checkout</h2>
        <OrderSummary />
        <DeliveryInformation />
    </section>
  )
}

export default Checkout
