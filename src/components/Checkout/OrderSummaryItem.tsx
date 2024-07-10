import { OrderSummaryItemType } from "@/redux/slice/api/user/checkoutSlice";

const OrderSummaryItem = ({ item }: { item: OrderSummaryItemType }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between my-2 ml-2">
        <div className="flex gap-2 items-center">
          <span className="text-lg font-medium">{item.name}</span>
          <span className="text-lg font-medium">x{item.quantity}</span>
        </div>
        <span className="text-lg font-medium">${item.price.toFixed(2)}</span>
      </div>
      <div>
        {item.options.map((option) => (
          <div key={option.id} className="flex gap-2 items-center ml-4">
            <span className="text-sm text-gray-400">{option.optionName}</span>
            {option.additionalPrice && (
              <span className="text-sm text-gray-400">
                +${option.additionalPrice.toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderSummaryItem;
