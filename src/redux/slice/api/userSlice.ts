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
export type UserResponse = {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    compressedProfilePicture: string;
    storeId: string;
    emailVerified: string;
    phoneNumberVerified: string;
    phoneNumber: string;
  };
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
        keepUnusedDataFor: 5,
      }),
      providesTags: ["User"],
    }),
  }),
});
export const { useForgotPasswordMutation, useResetPasswordMutation, useUserQuery } =
  authApiSlice;
