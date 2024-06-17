import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeStatus: "not-registered",
  selectedCategory: "all",
};
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStoreStatus: (state, action) => {
      state.storeStatus = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const {
  setStoreStatus,
  setSelectedCategory,
} = storeSlice.actions;
export default storeSlice.reducer;
