import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "./profileSlice";

export const storeDeliveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    outForDelivery: builder.mutation<AuthResponse, { orderId: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.OUT_FOR_DELIVERY}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreOrder"],
    }),
  }),
});
export const { useOutForDeliveryMutation } = storeDeliveryApiSlice;
