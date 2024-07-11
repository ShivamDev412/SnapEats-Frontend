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
  id?: string;
  optionId: string;
  optionName: string;
  choiceId: string | undefined;
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
    getCart: builder.query<AuthResponse<CartItemType[]>, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CART}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
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
    removeFromCart: builder.mutation<AuthResponse, { cartItemId: string }>({
      query: ({ cartItemId }) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CART}`,
        method: "DELETE",
        body: { cartItemId },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartQuantity: builder.mutation<
      AuthResponse,
      { cartItemId: string; quantity: number }
    >({
      query: ({ cartItemId, quantity }) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CART}`,
        method: "PUT",
        body: { cartItemId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    addNoteToCartItem: builder.mutation<
      AuthResponse,
      { cartItemId: string; note: string }
    >({
      query: ({ cartItemId, note }) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CART}/note`,
        method: "PUT",
        body: { cartItemId, note },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useAddNoteToCartItemMutation,
} = authApiSlice;
