import { IoCartOutline } from "react-icons/io5";
import useCart from "./useCart";
import SideDrawer from "../SideDrawer";
import CartList from "./CartList";

const Cart = () => {
  const {
    handleDrawerOpen,
    showCartDropDrawer,
    handleDrawerClose,
    cart,
    isLoading,
  } = useCart();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="relative">
      <button type="button" onClick={handleDrawerOpen} aria-label="cart" className="relative">
        {cart?.data && cart?.data?.length !== 0 && <span className="bg-primary text-zinc-100 rounded-full absolute h-5 w-5 text-sm">{cart?.data?.length}</span>}
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
