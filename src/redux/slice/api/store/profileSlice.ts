import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "@/redux/slice/api/apiSlice";
import { PhoneNumberType } from "../user/profileSlice";
export type AuthResponse<T = undefined> = {
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
export type FoodType = {
  id: string;
  foodType: string;
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
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.PROFILE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    getStore: builder.query<AuthResponse<StoreType>, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.PROFILE}`,
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
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.PROFILE}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Store"],
    }),
    getAllFoodTypes: builder.query<AuthResponse<FoodType[]>, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.FOOD_TYPE}`,
        method: "GET",
      }),
      providesTags: ["FoodType"],
    }),
    addFoodType: builder.mutation<AuthResponse, { id: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.FOOD_TYPE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FoodType", "StoreFoodType"],
    }),
    removeFoodType: builder.mutation<AuthResponse, { id: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.FOOD_TYPE}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["FoodType", "StoreFoodType"],
    }),
    getStoreFoodTypes: builder.query<AuthResponse<FoodType[]>, string>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.STORE_FOOD_TYPE}`,
        method: "GET",
      }),
      providesTags: ["StoreFoodType"],
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
  useLazyGetStoreQuery,
  useGetAllFoodTypesQuery,
  useAddFoodTypeMutation,
  useRemoveFoodTypeMutation,
  useGetStoreFoodTypesQuery,
} = storeApiSlice;
