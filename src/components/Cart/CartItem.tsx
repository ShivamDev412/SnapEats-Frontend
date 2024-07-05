import { CartItemType } from "@/redux/slice/api/user/cartSlice";
import React from "react";
import { FaMinus } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useCartItem from "./useCartItem";

type CartItemProps = {
  cartItem: CartItemType;
};

const QuantitySection = ({ quantity }: { quantity: number }) => {
  return (
    <div>
      {quantity === 0 ? (
        <button
          type="button"
          aria-label="Add to cart"
          className="border rounded-full border-zinc-400 text-zinc-400 hover:border-zinc-100 hover:text-zinc-100 transition-all"
        >
          <IoIosAdd className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex gap-2 items-center bg-zinc-600 rounded-full px-3 py-1">
          {quantity === 1 ? (
            <button
              type="button"
              aria-label="Delete Item"
            >
              <MdDelete className="h-5 w-5 text-zinc-400 hover:text-red-700 transition-colors" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Update Quantity"
            >
              <FaMinus className="w-5 h-5 text-zinc-400 hover:text-red-700 transition-colors" />
            </button>
          )}
          <span className="text-zinc-100 font-medium">{quantity}</span>
          <button
            type="button"
            aria-label="Add Item"
          >
            <IoIosAdd className="h-6 w-6 text-zinc-400 hover:text-green-700 transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const totalPrice =
    cartItem.price * cartItem.quantity +
    cartItem.options.reduce((acc, option) => acc + option.additionalPrice, 0);
  const { note, handleNoteChange } = useCartItem(cartItem.note);
  return (
    <div
      className="my-2 sm:my-4 p-4 bg-zinc-800 rounded-lg shadow-md"
      key={cartItem.id}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-[1rem] sm:text-base font-semibold text-zinc-100">{cartItem.name}</p>
        <p className="text-[1rem] sm:text-base font-semibold text-zinc-100">
          ${cartItem.price.toFixed(2)}
        </p>
      </div>
      <div className="text-xs sm:text-sm text-zinc-400 mb-2">
        {cartItem.options.map((option) => (
          <p key={option.id} className="mb-1">
            {option.optionName}: {option.choiceName} (+${option.additionalPrice})
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
        <QuantitySection quantity={cartItem.quantity} />
        <p className="font-medium text-[1rem] sm:text-lg text-zinc-100">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
