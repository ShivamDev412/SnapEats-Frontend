import { useLazyGetCartQuery } from "@/redux/slice/api/user/cartSlice";
import { useState } from "react";

const useCart = () => {
  const [showCartDropDrawer, setShowCartDropDrawer] = useState(false);
  const [trigger, { data: cart }] = useLazyGetCartQuery();
  const handleDrawerClose = () => {
    setShowCartDropDrawer(false);
  };
  const handleDrawerOpen = () => {
    trigger();
    setShowCartDropDrawer(true);
  };
  return {
    handleDrawerOpen,
    showCartDropDrawer,
    handleDrawerClose,
    cart,
  };
};
export default useCart;
