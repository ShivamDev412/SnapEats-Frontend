import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  is2FAEnabled: false,
  is2FAVerified: false,
  qrCode: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = null;
    },
    set2FAEnabled: (state, action) => {
      state.is2FAEnabled = action.payload;
    },
    set2FAVerified: (state, action) => {
      state.is2FAVerified = action.payload;
    },
    setQrCode: (state, action) => {
      state.qrCode = action.payload;
    },
  },
});
export const { setCredentials, logOut, set2FAEnabled, set2FAVerified,setQrCode } =
  authSlice.actions;
export default authSlice.reducer;
