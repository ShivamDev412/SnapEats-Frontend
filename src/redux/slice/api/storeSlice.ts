import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
import { PhoneNumberType } from "./userSlice";
type AuthResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export interface StoreRegisterType {
  name: string;
  email: string;
  address: string;
  countryCode: string;
  phoneNumber: string;
  status?: string;
  id?: string;
  lat: number;
  lon: number;
}
export interface StoreType extends StoreRegisterType {
  phoneNumberVerified: boolean;
  phoneOtp: string | null;
  phoneOtpExpiry: Date | null;
  emailVerified: boolean;
  emailOtp: string | null;
  emailOtpExpiry: Date | null;
  image: string;
  compressedImage: string;
}
export type StoreProfileData = {
  name: string;
  email: string;
  image?: string;
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
  image: File | null;
  name: string;
  description: string;
  price: number;
  category: string;
  options: OptionType[];
};

type MenuCategory = {
  value: string;
  label: string;
};
export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerStore: builder.mutation<
      AuthResponse<StoreRegisterType>,
      StoreRegisterType
    >({
      query: (body) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.STORE_REGISTER}`,
        method: "POST",
        body,
      }),
    }),
    getStoreByUser: builder.query<AuthResponse<StoreType>, string>({
      query: (id) => ({
        url: `${BASE_ROUTE.STORE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    getStore: builder.query<AuthResponse<StoreType>, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    updateStorePhoneNumber: builder.mutation<AuthResponse, PhoneNumberType>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.UPDATE_PHONE_NUMBER}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Store"],
    }),
    sendStorePhoneNumberOTP: builder.mutation<
      AuthResponse,
      { phoneNumber: string }
    >({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.SEND_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    verifyStorePhoneNumberOTP: builder.mutation<AuthResponse, { otp: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.VERIFY_OTP}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store"],
    }),
    resendStorePhoneNumberOTP: builder.mutation<
      AuthResponse,
      { phoneNumber: string }
    >({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.RESEND_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    sendStoreEmailOTP: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.SEND_EMAIL_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    verifyStoreEmailOTP: builder.mutation<AuthResponse, { otp: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.VERIFY_EMAIL_OTP}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store"],
    }),
    resentStoreEmailOTP: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.RESEND_EMAIL_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    updateStore: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Store"],
    }),
    menuCategories: builder.query<AuthResponse<MenuCategory[]>, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE_MENU}${ENDPOINTS.CATEGORIES}`,
        method: "GET",
      }),
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
    getMenuChoices: builder.query<AuthResponse<{ value: string; label: string }[]>, string>({
      query: (id) => ({
        url: `${BASE_ROUTE.STORE_MENU}${ENDPOINTS.CHOICE}/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useRegisterStoreMutation,
  useLazyGetStoreByUserQuery,
  useGetStoreQuery,
  useUpdateStorePhoneNumberMutation,
  useSendStorePhoneNumberOTPMutation,
  useVerifyStorePhoneNumberOTPMutation,
  useResendStorePhoneNumberOTPMutation,
  useSendStoreEmailOTPMutation,
  useVerifyStoreEmailOTPMutation,
  useResentStoreEmailOTPMutation,
  useUpdateStoreMutation,
  useMenuCategoriesQuery,
  useMenuOptionsQuery,
  useLazyGetMenuChoicesQuery,
  useLazyGetStoreQuery,
} = storeApiSlice;
