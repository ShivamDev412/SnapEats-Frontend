import { UnknownAction, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/api/apiSlice";
import authSlice from "./slice/authSlice";


const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
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