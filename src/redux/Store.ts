import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./RootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./slice/api/apiSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger, apiSlice.middleware, socketMiddleware),
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;
