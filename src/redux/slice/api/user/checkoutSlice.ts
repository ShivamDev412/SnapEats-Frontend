import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "../store/profileSlice";
export type OrderSummaryItemType = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options: {
    id: string;
    optionName: string;
    additionalPrice?: number;
  }[];
  totalPrice: number;
};

type StoreSummary = {
  storeId: string;
  storeName: string;
  deliveryFee: number;
  items: OrderSummaryItemType[];
  subtotal: number;
};
export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderSummary: builder.query<AuthResponse<StoreSummary[]>, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CHECKOUT}`,
        method: "GET",
      }),
      providesTags: ["Checkout"],
    }),
  }),
});
export const { useGetOrderSummaryQuery } = checkoutApiSlice;
