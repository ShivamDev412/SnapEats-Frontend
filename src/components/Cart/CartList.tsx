import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartItemType } from "@/redux/slice/api/user/cartSlice";
import CartItem from "./CartItem";
import Button from "../Button";
import { BROWSER_ROUTE } from "@/utils/Endpoints";

type CartListProps = {
  cart: CartItemType[];
  handleDrawerClose: () => void;
};

const CartList: React.FC<CartListProps> = ({ cart, handleDrawerClose }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    handleDrawerClose();
    navigate(BROWSER_ROUTE.CHECKOUT);
  };
  return (
    <div className="bg-zinc-900 h-screen w-[4in] text-zinc-100 p-6 shadow-lg flex flex-col justify-between">
      <h3 className="text-xl sm:text-3xl font-bold flex items-center gap-2">
        <IoIosArrowRoundBack
          className="md:hidden h-10 w-10"
          onClick={handleDrawerClose}
        />
        Your Cart
      </h3>
      <div className="overflow-auto my-2 flex-1 max-h-[85vh]">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>

      {cart.length === 0 ? (
        <div className="flex-1">
          <p className="text-center">Your cart is empty</p>
        </div>
      ) : (
        <Button onClick={handleCheckout}>Proceed to Checkout</Button>
      )}
    </div>
  );
};

export default CartList;
