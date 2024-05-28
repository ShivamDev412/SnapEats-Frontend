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
  }),
});
export const { useForgotPasswordMutation, useResetPasswordMutation } = authApiSlice;
