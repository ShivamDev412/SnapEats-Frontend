import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  popUpOrderMessages: { orderId: string, message: string }[] | null;
} = {
  popUpOrderMessages: [],
};

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    setOrderStatus: (state, action) => {
      const { orderId, message } = action.payload;
      if (state.popUpOrderMessages) {
        const existingMessageIndex = state.popUpOrderMessages.findIndex(
          (item) => item.orderId === orderId
        );
        if (existingMessageIndex !== -1) {
          state.popUpOrderMessages[existingMessageIndex].message = message;
        } else {
          state.popUpOrderMessages.push({ orderId, message });
        }
      } else {
        state.popUpOrderMessages = [{ orderId, message }];
      }
    },
    clearOrderStatus: (state, action) => {
      state.popUpOrderMessages =
        state.popUpOrderMessages?.filter(
          (item) => item.orderId !== action.payload
        ) || null;
    },
  },
});

export const { setOrderStatus, clearOrderStatus } = userOrderSlice.actions;
export default userOrderSlice.reducer;
