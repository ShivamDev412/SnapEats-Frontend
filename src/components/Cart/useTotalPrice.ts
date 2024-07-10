import { CartItemType } from "@/redux/slice/api/user/cartSlice";

const useTotalPrice = (cartItem: CartItemType) => {
  const totalPrice =
    (cartItem.price +
      cartItem.options.reduce(
        (acc, option) => acc + option.additionalPrice,
        0
      )) *
    cartItem.quantity;
  return totalPrice;
};
export default useTotalPrice;
