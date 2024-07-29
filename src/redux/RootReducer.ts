import { UnknownAction, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/api/apiSlice";
import authSlice from "./slice/authSlice";
import loadingSlice from "./slice/loadingSlice";
import storeSlice from "./slice/storeSlice";
import accountSlice from "./slice/accountSlice";
import searchSlice from "./slice/searchSlice";
import storeOrderSlice from "./slice/storeOrderSlice";
const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  loading: loadingSlice,
  account: accountSlice,
  store: storeSlice,
  search: searchSlice,
  storeOrder: storeOrderSlice,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction
) => {
  if (action.type === "auth/logOut") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
