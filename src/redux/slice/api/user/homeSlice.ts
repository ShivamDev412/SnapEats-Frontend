import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
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
export type CategoryType = {
  id: string;
  name: string;
  isActive: boolean;
};
export type MenuItemsType = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  prepTime: number;
  isVeg: boolean;
  compressedImage?: string;
  category: CategoryType;
  options: {
    id: string;
    option: {
      id: string;
      name: string;
    };
    choices: {
      id: string;
      customChoice?: string;
      additionalPrice?: number;
    }[];
  }[];
};
export type ReviewType = {
  rating: number;
  comment?: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
};
export interface StoreDetailType extends StoreType {
  phoneNumber: string;
  countryCode: string;
  userId: string;
  specialEventOpenTime?: Date;
  specialEventCloseTime?: Date;
  menuItems: MenuItemsType[];
  address: string;
  reviews: ReviewType[];
}
export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<AuthResponse<StoreType[]>, string>({
      query: (query) => ({
        url: `${BASE_ROUTE.HOME}/${query}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getStoreDetail: builder.query<AuthResponse<StoreDetailType>, string>({
      query: (storeId) => ({
        url: `${BASE_ROUTE.HOME}${ENDPOINTS.HOME_STORE_DETAILS}/${storeId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetStoresQuery, useGetStoreDetailQuery } = homeApiSlice;