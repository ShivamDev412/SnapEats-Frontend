import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "../store/profileSlice";
export type OrderTypeResponse<T> = {
  orders: T;
  totalCount: number;
  page: number;
};
export type OrderItems = {
  id: string;
  name: string;
  menuItem: {
    image: string;
    compressedImage: string;
  };
  menuItemId: string;
  quantity: number;
  note: string | null;
  options: {
    id: string;
    orderItemId: string;
    name: string;
    choice: string;
    additionalPrice: number | null;
  }[];
}[];
export type OrderType = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  store?: {
    id: string;
    name: string;
  };
  user?:{
    id:string;
    name:string;
  }
  items: OrderItems;
};
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      AuthResponse<OrderTypeResponse<OrderType[]>>,
      number
    >({
      query: (page) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ORDER}?page=${page}`,
        method: "GET",
      }),
      keepUnusedDataFor: 30,
    }),
    getOrdersLiveStatus: builder.query<AuthResponse, void>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ORDER_STATUS}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetOrdersQuery, useLazyGetOrdersLiveStatusQuery } = orderApiSlice;
