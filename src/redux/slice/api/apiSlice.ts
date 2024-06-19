import { RootState } from "@/redux/RootReducer";
import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../authSlice";
export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    const response = (await baseQuery(
      `${BASE_ROUTE.AUTH}${ENDPOINTS.REFRESH_TOKEN}`,
      api,
      extraOptions
    )) as QueryReturnValue<
      {
        success: boolean;
        "auth-token": string;
      },
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >;

    if (response.data?.success) {
      api.dispatch(setCredentials(response?.data["auth-token"]));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User", "Address", "Store", "Menu", "MenuDetail","Categories"],
  endpoints: () => ({}),
});
