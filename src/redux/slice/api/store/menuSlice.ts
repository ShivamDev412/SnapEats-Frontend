import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "@/redux/slice/api/apiSlice";
type AuthResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

type ChoiceType = {
  id: string;
  choiceId: string;
  name: string;
  additionalPrice: number;
};

type OptionType = {
  id: string;
  optionId: string;
  choices: ChoiceType[];
};

export type MenuItemType = {
  image: any;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  prepTime: number;
  options: OptionType[];
};
export type MenuType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  prepTime: number;
  compressedImage: string;
  category: {
    id: string;
    name: string;
  };
};
export interface MenuDetailType extends MenuType {
  options: {
    id: string;
    optionId: string;
    option: {
      id: string;
      name: string;
    };
    choices: {
      id: string;
      predefinedChoiceId: string | null;
      predefinedChoice: {
        id: string;
        name: string;
      } | null;
      customChoice: string | null;
      additionalPrice: number;
    }[];
  }[];
}
export type MenuCategory = {
  value: string;
  label: string;
  menuCount: number;
};
export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    menuCategories: builder.query<AuthResponse<MenuCategory[]>, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE_MENU}${ENDPOINTS.CATEGORIES}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    menuOptions: builder.query<
      AuthResponse<{ value: string; label: string }[]>,
      string
    >({
      query: () => ({
        url: `${BASE_ROUTE.STORE_MENU}${ENDPOINTS.OPTIONS}`,
        method: "GET",
      }),
    }),
    getMenuChoices: builder.query<
      AuthResponse<{ value: string; label: string }[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_ROUTE.STORE_MENU}${ENDPOINTS.CHOICE}/${id}`,
        method: "GET",
      }),
    }),
    addMenuItem: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE_MENU}`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Menu", "Categories"],
    }),
    menuItemDetails: builder.query<AuthResponse<MenuDetailType>, string>({
      query: (menuId) => ({
        url: `${BASE_ROUTE.STORE_MENU}/${menuId}`,
        method: "GET",
      }),
      providesTags: ["MenuDetail"],
    }),
    storeMenuItems: builder.query<AuthResponse<MenuType[]>, string>({
      query: (query) => ({
        url: `${BASE_ROUTE.STORE_MENU}${query}`,
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),
    updateMenuItem: builder.mutation<AuthResponse, FormData>({
      query: (formData) => ({
        url: BASE_ROUTE.STORE_MENU,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Menu", "Categories", "MenuDetail"],
    }),
    deleteMenuItem: builder.mutation<AuthResponse, string>({
      query: (menuId) => ({
        url: `${BASE_ROUTE.STORE_MENU}/${menuId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu", "Categories"],
    }),
  }),
});
export const {
  useMenuCategoriesQuery,
  useMenuOptionsQuery,
  useLazyGetMenuChoicesQuery,
  useAddMenuItemMutation,
  useStoreMenuItemsQuery,
  useMenuItemDetailsQuery,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = storeApiSlice;
