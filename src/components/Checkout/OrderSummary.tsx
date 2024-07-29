import {
  OrderSummaryType,
  OrderSummaryItemType,
} from "@/redux/slice/api/user/checkoutSlice";
import OrderSummaryItem from "./OrderSummaryItem";
import { useTranslation } from "react-i18next";


const OrderSummary = ({orderSummary}:{orderSummary:OrderSummaryType}) => {

  const { t } = useTranslation();
  const grandTotal = orderSummary?.grandTotal || 0;
  return (
    <div className="bg-zinc-800 rounded-lg p-4 w-full">
      <h3 className="text-2xl font-semibold mb-4">{t("orderSummary")}</h3>
      <div>
        {orderSummary?.orderSummary?.map((store) => {

          return (
            <div key={store.storeId} className="mt-4">
              <h4 className="text-xl font-semibold mb-2">{store.storeName}</h4>
              {store?.items?.map((item: OrderSummaryItemType) => (
                <OrderSummaryItem key={item.id} item={item} />
              ))}
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">{t("subtotal")}</span>
                <span className="text-lg font-medium">
                  ${store.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">GST (5%)</span>
                <span className="text-lg font-medium">${store.gst.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">PST (7%)</span>
                <span className="text-lg font-medium">${store.pst.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">{t("deliveryFee")}</span>
                <span className="text-lg font-medium">
                  ${store.deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 font-bold">
                <span className="text-lg">{t("total")}</span>
                <span className="text-lg">
                  ${store.totalWithTax.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-4 border-t pt-4">
        <span className="text-xl font-semibold">{t("grandTotal")}</span>
        <span className="text-xl font-semibold">${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
