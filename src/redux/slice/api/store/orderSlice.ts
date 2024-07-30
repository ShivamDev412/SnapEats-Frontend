import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "./profileSlice";
import { OrderItems, OrderTypeResponse } from "../user/orderSlice";

export type StoreOrderType = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
  items: OrderItems;
}[];
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
    getStoreOrders: builder.query<AuthResponse<OrderTypeResponse<StoreOrderType>>, number>({
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
