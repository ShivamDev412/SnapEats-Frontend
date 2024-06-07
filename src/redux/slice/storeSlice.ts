import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeStatus: "not-registered",
};
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStoreStatus: (state, action) => {
      state.storeStatus = action.payload;
    },
  },
});
export const { setStoreStatus } = storeSlice.actions;
export default storeSlice.reducer;
