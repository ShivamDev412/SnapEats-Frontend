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
    choiceName: string;
    additionalPrice?: number;
  }[];
  totalPrice: number;
  gst: number;
  pst: number;
};

export type StoreSummary = {
  storeId: string;
  storeName: string;
  stripeAccountId: string;
  deliveryFee: number;
  items: OrderSummaryItemType[];
  subtotal: number;
  gst: number;
  pst: number;
  totalWithTax: number;
};
export type OrderSummaryType = {
  orderSummary: StoreSummary[];
  grandTotal: number;
  gstRate: number;
  pstRate: number;
};
export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderSummary: builder.query<AuthResponse<OrderSummaryType>, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CHECKOUT}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Checkout"],
    }),
    placeOrder: builder.mutation<AuthResponse<any>,{ orderItems: StoreSummary[] }>({
      query: ({ orderItems }) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.PLACE_ORDER}`,
        method: "POST",
        body: orderItems,
      }),
      invalidatesTags:["Cart"]
    }),
  }),
});
export const { useGetOrderSummaryQuery, usePlaceOrderMutation } =
  checkoutApiSlice;
