import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "../store/profileSlice";

type AddToCartType = {
  menuItemId: string;
  menuItemName: string;
  menuItemPrice: number;
  note: string;
  options: CartOption[];
};
type CartOption = {
  id: string;
  optionId: string;
  optionName: string;
  choiceId: string;
  choiceName: string;
  additionalPrice: number;
};

export type CartItemType = {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
  options: CartOption[];
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<AuthResponse<CartItemType[]>, void>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CART}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    addToCart: builder.mutation<AuthResponse, AddToCartType>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CART}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const { useLazyGetCartQuery, useAddToCartMutation } = authApiSlice;
