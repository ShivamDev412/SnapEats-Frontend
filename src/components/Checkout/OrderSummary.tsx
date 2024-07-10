import {
  useGetOrderSummaryQuery,
  OrderSummaryItemType,
} from "@/redux/slice/api/user/checkoutSlice";
import OrderSummaryItem from "./OrderSummaryItem";

// Example tax rates
const GST_RATE = 0.05;
const PST_RATE = 0.07; 

const OrderSummary = () => {
  const { data: orderSummary } = useGetOrderSummaryQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const calculateTax = (amount: number, rate: number) => amount * rate;

  const grandTotal =
    orderSummary?.data?.reduce((total, store) => {
      const gst = calculateTax(store.subtotal, GST_RATE);
      const pst = calculateTax(store.subtotal, PST_RATE);
      return total + store.subtotal + gst + pst + store.deliveryFee;
    }, 0) || 0;

  return (
    <div className="bg-zinc-800 rounded-lg p-4">
      <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
      <div>
        {orderSummary?.data?.map((store) => {
          const gst = calculateTax(store.subtotal, GST_RATE);
          const pst = calculateTax(store.subtotal, PST_RATE);
          const totalWithTaxesAndFees = store.subtotal + gst + pst + store.deliveryFee;

          return (
            <div key={store.storeId} className="mt-4">
              <h4 className="text-xl font-semibold mb-2">{store.storeName}</h4>
              {store.items.map((item: OrderSummaryItemType) => (
                <OrderSummaryItem key={item.id} item={item} />
              ))}
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg font-medium">
                  ${store.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">GST (5%)</span>
                <span className="text-lg font-medium">${gst.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">PST (7%)</span>
                <span className="text-lg font-medium">${pst.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">Delivery Fee</span>
                <span className="text-lg font-medium">
                  ${store.deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 font-bold">
                <span className="text-lg">Total</span>
                <span className="text-lg">${totalWithTaxesAndFees.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-4 border-t pt-4">
        <span className="text-xl font-semibold">Grand Total</span>
        <span className="text-xl font-semibold">${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
