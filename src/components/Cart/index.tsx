import { IoCartOutline } from "react-icons/io5";
import useCart from "./useCart";
import SideDrawer from "../SideDrawer";
import CartList from "./CartList";

const Cart = () => {
  const { handleDrawerOpen, showCartDropDrawer, handleDrawerClose, cart } =
    useCart();
    console.log(cart?.data);
  return (
    <div className="relative">
      <button type="button" onClick={handleDrawerOpen} aria-label="cart">
        <IoCartOutline className="h-7 w-7" />
      </button>
      <SideDrawer
        showCartDropDrawer={showCartDropDrawer}
        handleDrawerClose={handleDrawerClose}
      >
        <CartList cart={cart?.data || []} />
      </SideDrawer>
    </div>
  );
};

export default Cart;
