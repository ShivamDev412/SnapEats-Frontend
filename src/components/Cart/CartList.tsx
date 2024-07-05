import { CartItemType } from "@/redux/slice/api/user/cartSlice";
import CartItem from "./CartItem";
import Button from "../Button";

type CartListProps = {
  cart: CartItemType[];
};

const CartList: React.FC<CartListProps> = ({ cart }) => {
  return (
    <div className="bg-zinc-900 h-screen w-[4in] text-zinc-100 p-6 shadow-lg flex flex-col justify-between">
      <h3 className="text-3xl font-bold border-b border-zinc-600 pb-4">
        Your Cart
      </h3>
      <div className="overflow-auto flex-1">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button>Proceed to Checkout</Button>
    </div>
  );
};

export default CartList;
