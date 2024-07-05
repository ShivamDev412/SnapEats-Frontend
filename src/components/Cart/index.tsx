import { IoCartOutline } from "react-icons/io5";
import useCart from "./useCart";
import SideDrawer from "../SideDrawer";
import CartList from "./CartList";

const Cart = () => {
  const { handleDrawerOpen, showCartDropDrawer, handleDrawerClose, cart } =
    useCart()
  return (
    <div className="relative">
      <button type="button" onClick={handleDrawerOpen} aria-label="cart">
        <IoCartOutline className="h-auto w-7 -mb-1" />
      </button>
      <SideDrawer
        showCartDropDrawer={showCartDropDrawer}
        handleDrawerClose={handleDrawerClose}
      >
        <CartList
          cart={cart?.data || []}
          handleDrawerClose={handleDrawerClose}
        />
      </SideDrawer>
    </div>
  );
};

export default Cart;
