import { BASE_ROUTE } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "../store/profileSlice";
export type StoreType = {
  id: string;
  name: string;
  image: string | null;
  compressedImage: string | null;
  openTime: string;
  closeTime: string;
  deliveryFee: number;
  rating: number;
  travelTime: {
    min: number;
    max: number;
  };
};
export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<AuthResponse<StoreType[]>, string>({
      query: (query) => ({
        url: `${BASE_ROUTE.HOME}/${query}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetStoresQuery } = homeApiSlice;
