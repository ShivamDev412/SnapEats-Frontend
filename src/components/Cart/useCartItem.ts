import { useRemoveFromCartMutation, useUpdateCartQuantityMutation } from "@/redux/slice/api/user/cartSlice";
import Toast from "@/utils/Toast";
import { useState } from "react";

const useCartItem = (noteData: string) => {
  const [note, setNote] = useState<string>(noteData);
  const handleNoteChange = (value: string) => {
    setNote(value);
  };
  const [deleteItem, { isLoading }] = useRemoveFromCartMutation();
  const removeFromCart = async (cartItemId: string) => {
    try {
      const res = await deleteItem({
        cartItemId,
      }).unwrap();
      if (res.success) {
        // Do something
      }
    } catch (error: any) {
      Toast(error?.data?.message, "error");
    }
  };
  const [updateCartQuantityHandler] = useUpdateCartQuantityMutation();
  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const res = await updateCartQuantityHandler({
        cartItemId,
        quantity,
      }).unwrap();
      if (res.success) {
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  return {
    note,
    handleNoteChange,
    isLoading,
    removeFromCart,
    updateCartQuantity,
  };
};
export default useCartItem;
