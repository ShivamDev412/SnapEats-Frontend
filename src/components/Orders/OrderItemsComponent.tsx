import { FC } from "react";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import { t } from "i18next";
import { OrderItems } from "@/redux/slice/api/user/orderSlice";
const OrderItemsComponent: FC<{ orderItems: OrderItems }> = ({
  orderItems,
}) => {
  return (
    <>
      <h4 className="text-xl font-semibold mb-2 ">{t("items")}:</h4>
      <div className="space-y-4">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-4">
            <LazyLoadedImageComponent
              image={item.menuItem.image}
              compressedImage={item.menuItem.compressedImage}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <p className="text-lg font-medium">
                {item.name} x{item.quantity}
              </p>
              {item.note && (
                <p className="text-gray-400">
                  {t("note")}: {item.note}
                </p>
              )}
              <ul className="list-inside text-gray-400 list-none">
                {item.options.map((option) => (
                  <li key={option.id}>
                    {option.name}: {option.choice} (+$
                    {option.additionalPrice?.toFixed(2) || "0.00"})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderItemsComponent;
