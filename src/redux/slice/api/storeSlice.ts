import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
type AuthResponse = {
  success: boolean;
  message: string;
  data: StoreRegisterType;
};
export type StoreRegisterType = {
  name: string;
  email: string;
  address: string;
  countryCode: string;
  phoneNumber: string;
  status?: string;
  id?: string;
  lat: number;
  lon: number;
};
export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerStore: builder.mutation<AuthResponse, StoreRegisterType>({
      query: (body) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.STORE_REGISTER}`,
        method: "POST",
        body,
      }),
    }),
    getStore: builder.query<AuthResponse, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}/`,
        method: "GET",
      }),
    }),
  }),
});
export const { useRegisterStoreMutation, useGetStoreQuery } = storeApiSlice;
