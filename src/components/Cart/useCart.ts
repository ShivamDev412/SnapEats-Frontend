import { useGetCartQuery } from "@/redux/slice/api/user/cartSlice";
import { useState } from "react";

const useCart = () => {
  const [showCartDropDrawer, setShowCartDropDrawer] = useState(false);
  const { data: cart, isLoading } = useGetCartQuery("",{
    refetchOnMountOrArgChange: true,
  });
  const handleDrawerClose = () => {
    setShowCartDropDrawer(false);
  };
  const handleDrawerOpen = () => {
    setShowCartDropDrawer(true);
  };

  return {
    handleDrawerOpen,
    showCartDropDrawer,
    handleDrawerClose,
    cart,
    isLoading,
  };
};
export default useCart;
