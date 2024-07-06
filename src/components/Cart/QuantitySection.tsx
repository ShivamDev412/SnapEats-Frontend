import { FaMinus } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const QuantitySection = ({
  quantity,
  removeFromCart,
  updateCartQuantity,
}: {
  quantity: number;
  removeFromCart: () => void;
  updateCartQuantity: (quantity: number) => void;
}) => {
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
            <button type="button" aria-label="Delete Item">
              <MdDelete
                className="h-5 w-5 text-zinc-400 hover:text-red-700 transition-colors"
                onClick={removeFromCart}
              />
            </button>
          ) : (
            <button type="button" aria-label="Update Quantity" onClick={() => updateCartQuantity(quantity - 1)}>
              <FaMinus className="w-5 h-5 text-zinc-400 hover:text-red-700 transition-colors" />
            </button>
          )}
          <span className="text-zinc-100 font-medium">{quantity}</span>
          <button
            type="button"
            aria-label="Add Item"
            onClick={() => updateCartQuantity(quantity + 1)}
          >
            <IoIosAdd className="h-6 w-6 text-zinc-400 hover:text-green-700 transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
};
export default QuantitySection;
