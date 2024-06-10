import { createSlice } from "@reduxjs/toolkit";

type AccountType = {
  accountType: "STORE" | "USER";
};
const initialState: AccountType = {
  accountType: "USER",
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountType: (state, action) => {
      state.accountType = action.payload;
    },
  },
});
export const { setAccountType } = accountSlice.actions;
export default accountSlice.reducer;
