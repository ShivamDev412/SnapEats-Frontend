import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "@/redux/slice/api/apiSlice";
export type AuthResponse = {
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
  language: string;
};
export type UserResponse = {
  success: boolean;
  data: UserType;
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
  useUpdatePhoneNumberMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useSendEmailOTPMutation,
  useVerifyEmailOTPMutation,
  useResentEmailOTPMutation,
  useUpdateUserMutation,
} = authApiSlice;
