import { createSlice } from "@reduxjs/toolkit";
export type OrderDataType = {
  status: string;
  orderId: string;
  storeName: string;
};
const initialState: {
  popUpOrderMessages: OrderDataType[];
} = {
  popUpOrderMessages: [],
};

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    setOrderStatus: (state, action) => {
      const isOrderExist = state.popUpOrderMessages?.find(
        (item) => item.orderId === action.payload.orderId
      );
      if (!isOrderExist) {
        state.popUpOrderMessages?.push(action.payload);
      } else {
        if (action.payload.status === "DELIVERED") {
          state.popUpOrderMessages = state.popUpOrderMessages?.filter(
            (item) => item.orderId !== action.payload.orderId
          );
          return;
        } else
          state.popUpOrderMessages = state.popUpOrderMessages?.map((item) => {
            if (item.orderId === action.payload.orderId) {
              return action.payload;
            }
            return item;
          });
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
