import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "./apiSlice";
type AuthResponse = {
  success: boolean;
  message: string;
};
export type ForgotPasswordType = {
  email: string;
};
export type ResetPasswordType = {
  password: string;
  confirmPassword: string;
  token: string;
};
export type UserType = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  compressedProfilePicture: string;
  storeId: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  phoneNumber: string;
  countryCode: string;
};
export type UserResponse = {
  success: boolean;
  data: UserType;
};
export type AddressType = {
  id?: string;
  apt?: string;
  block?: string;
  address: string;
  lat: number;
  lon: number;
  type: string;
  isDefault?: boolean;
};
export type AddressDataResponse = {
  success: boolean;
  data?: AddressType[];
  message: string;
};
export type PhoneNumberType = {
  countryCode: string;
  phoneNumber: string;
};
export type UpdateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
};
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<AuthResponse, ForgotPasswordType>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.FORGOT_PASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordType>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.RESET_PASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    user: builder.query<UserResponse, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}/`,
        method: "GET",
        }),
      providesTags: ["User"],
    
    }),
    logOut: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.LOGOUT}`,
        method: "POST",
      }),
    }),
    address: builder.query<AddressDataResponse, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ADDRESS}`,
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    createAddress: builder.mutation<AddressDataResponse, AddressType>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ADDRESS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation<
      AddressDataResponse,
      { data: AddressType; id: string }
    >({
      query: ({ data, id }) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ADDRESS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation<AddressDataResponse, string>({
      query: (id) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ADDRESS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
    markAddressAsDefault: builder.mutation<AddressDataResponse, string>({
      query: (id) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.MARK_ADDRESS_AS_DEFAULT}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Address"],
    }),
    updatePhoneNumber: builder.mutation<AuthResponse, PhoneNumberType>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.UPDATE_PHONE_NUMBER}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    sendOTP: builder.mutation<AuthResponse, { phoneNumber: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.SEND_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation<AuthResponse, { otp: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.VERIFY_OTP}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resendOTP: builder.mutation<AuthResponse, { phoneNumber: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.RESEND_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    sendEmailOTP: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.SEND_EMAIL_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmailOTP: builder.mutation<AuthResponse, { otp: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.VERIFY_EMAIL_OTP}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resentEmailOTP: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.RESEND_EMAIL_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUserQuery,
  useLogOutMutation,
  useAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useMarkAddressAsDefaultMutation,
  useUpdatePhoneNumberMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useSendEmailOTPMutation,
  useVerifyEmailOTPMutation,
  useResentEmailOTPMutation,
  useUpdateUserMutation,
} = authApiSlice;
