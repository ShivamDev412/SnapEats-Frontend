import { CartItemType } from "@/redux/slice/api/user/cartSlice";
import React from "react";
import useCartItem from "./useCartItem";
import QuantitySection from "./QuantitySection";

type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const totalPrice =
    (cartItem.price +
      cartItem.options.reduce(
        (acc, option) => acc + option.additionalPrice,
        0
      )) *
    cartItem.quantity;
  const { note, handleNoteChange, removeFromCart, updateCartQuantity } =
    useCartItem(cartItem.note);
  return (
    <div
      className="my-2 sm:my-4 p-4 bg-zinc-800 rounded-lg shadow-md"
      key={cartItem.id}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-[1rem] sm:text-base font-semibold text-zinc-100">
          {cartItem.name}
        </p>
        <p className="text-[1rem] sm:text-base font-semibold text-zinc-100">
          ${cartItem.price.toFixed(2)}
        </p>
      </div>
      <div className="text-xs sm:text-sm text-zinc-400 mb-2">
        {cartItem.options.map((option) => (
          <p key={option.id} className="mb-1">
            {option.optionName}: {option.choiceName} (+${option.additionalPrice}
            )
          </p>
        ))}
      </div>
      <textarea
        name="note"
        id="note"
        placeholder="Add a note..."
        value={note}
        onChange={(e) => handleNoteChange(e.target.value)}
        className="w-full p-2 mb-2 bg-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 text-xs sm:text-sm"
      ></textarea>
      <div className="flex justify-between items-center mt-1 sm:mt-2 text-sm sm:text-xs">
        <QuantitySection
          quantity={cartItem.quantity}
          removeFromCart={() => removeFromCart(cartItem.id)}
          updateCartQuantity={(quantity) =>
            updateCartQuantity(cartItem.id, quantity)
          }
        />
        <p className="font-medium text-[1rem] sm:text-lg text-zinc-100">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
