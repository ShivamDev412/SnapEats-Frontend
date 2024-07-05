import { IoIosArrowRoundBack } from "react-icons/io";

import { CartItemType } from "@/redux/slice/api/user/cartSlice";
import CartItem from "./CartItem";
import Button from "../Button";

type CartListProps = {
  cart: CartItemType[];
  handleDrawerClose: () => void;
};

const CartList: React.FC<CartListProps> = ({ cart, handleDrawerClose }) => {
  return (
    <div className="bg-zinc-900 h-screen w-[4in] text-zinc-100 p-6 shadow-lg flex flex-col justify-between">
      <h3 className="text-3xl font-bold flex items-center gap-2">
        <IoIosArrowRoundBack className="md:hidden h-10 w-10" onClick={handleDrawerClose}/>
        Your Cart
      </h3>
      <div className="overflow-auto flex-1 my-2">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button>Proceed to Checkout</Button>
    </div>
  );
};

export default CartList;
