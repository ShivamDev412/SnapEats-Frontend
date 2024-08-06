import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "./profileSlice";
import { OrderType, OrderTypeResponse } from "../user/orderSlice";

export const storeOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    acceptOrder: builder.mutation<AuthResponse, string>({
      query: (orderId) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.ACCEPT_ORDER}`,
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: ["StoreOrder"],
    }),
    rejectOrder: builder.mutation<AuthResponse, string>({
      query: (orderId) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.CANCEL_ORDER}`,
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: ["StoreOrder"],
    }),
    getStoreOrders: builder.query<
      AuthResponse<OrderTypeResponse<OrderType[]>>,
      number
    >({
      query: (pageNumber) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.ORDER}?page=${pageNumber}`,
        method: "GET",
      }),
      providesTags: ["StoreOrder"],
      keepUnusedDataFor: 30,
    }),
  }),
});
export const {
  useAcceptOrderMutation,
  useRejectOrderMutation,
  useGetStoreOrdersQuery,
} = storeOrderApiSlice;
