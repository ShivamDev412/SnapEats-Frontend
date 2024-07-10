import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "../store/profileSlice";
export interface PaymentMethodType {
  id: string;
  card: {
    brand: string;
    last4: string;
    name: string;
  };
}
export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<
      AuthResponse<{
        paymentMethods: { data: PaymentMethodType[] };
        defaultPaymentMethod: string | null;
      }>,
      void
    >({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.PAYMENTS}`,
        method: "GET",
      }),
      keepUnusedDataFor: 30,
      providesTags: ["PaymentMethods"],
    }),
    addNewPaymentMethod: builder.mutation<
      AuthResponse<PaymentMethodType>,
      { name: string; paymentMethodId: string }
    >({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.PAYMENTS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
    setDefaultPaymentMethod: builder.mutation<
      AuthResponse<PaymentMethodType>,
      string
    >({
      query: (paymentMethodId) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.PAYMENTS}/${paymentMethodId}`,
        method: "POST",
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
    deletePaymentMethod: builder.mutation<
      AuthResponse<PaymentMethodType>,
      string
    >({
      query: (paymentMethodId) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.PAYMENTS}/${paymentMethodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
  }),
});
export const {
  useGetPaymentMethodsQuery,
  useAddNewPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
} = paymentApiSlice;
