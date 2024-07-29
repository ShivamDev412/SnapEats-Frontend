import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type OrderDataType = {
  id: string;
  totalAmount: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    note: string | null;
    options: {
      id: string;
      orderItemId: string;
      name: string;
      choice: string;
      additionalPrice: number | null;
    }[];
    menuItemId: string;
  }[];
};
const initialState: {
  popUpOrderData: OrderDataType[] | null;
} = {
  popUpOrderData: [],
};
const storeOrderSlice = createSlice({
  name: "storeOrder",
  initialState,
  reducers: {
    addOrderData: (state, action: PayloadAction<OrderDataType>) => {
      if (state.popUpOrderData) {
        state.popUpOrderData.push(action.payload);
      } else {
        state.popUpOrderData = [action.payload];
      }
    },
    removeOrderData: (state, action) => {
      state.popUpOrderData = state.popUpOrderData?.filter(
        (item) => item.id !== action.payload
      ) || null;
    },
  },
});
export const { addOrderData, removeOrderData } = storeOrderSlice.actions;
export default storeOrderSlice.reducer;
