import {
  useAddNoteToCartItemMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from "@/redux/slice/api/user/cartSlice";
import Toast from "@/utils/Toast";
import { useState, useEffect } from "react";
import useDebounce from "@/Hooks/useDebounce";

const useCartItem = (noteData: string, cartItemId: string) => {
  const [note, setNote] = useState<string>(noteData);
  const debouncedNote = useDebounce(note, 1000);
  const [addNote] = useAddNoteToCartItemMutation();
  const [deleteItem, { isLoading }] = useRemoveFromCartMutation();
  const [updateCartQuantityHandler] = useUpdateCartQuantityMutation();

  const handleNoteChange = (value: string) => {
    setNote(value);
  };

  useEffect(() => {
    if (debouncedNote !== noteData) {
      const updateNote = async () => {
        try {
          await addNote({
            cartItemId: cartItemId,
            note: debouncedNote,
          }).unwrap();
        } catch (error: any) {
          Toast(error.data.message, "error");
        }
      };
      updateNote();
    }
  }, [debouncedNote, noteData, addNote]);

  const removeFromCart = async (cartItemId: string) => {
    try {
      await deleteItem({
        cartItemId,
      }).unwrap();
    } catch (error: any) {
      Toast(error?.data?.message, "error");
    }
  };

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
