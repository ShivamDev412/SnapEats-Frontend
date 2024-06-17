import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "@/redux/slice/api/apiSlice";
type AuthResponse = {
  "auth-token"?: string;
  isStoreRegistered?: boolean;
  success: boolean;
  message: string;
};
type LoginType = {
  email: string;
  password: string;
};
export type SignupType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type ResetPasswordType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginType>({
      query: (data) => ({
        url: `${BASE_ROUTE.AUTH}${ENDPOINTS.LOGIN}`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupType>({
      query: (data) => ({
        url: `${BASE_ROUTE.AUTH}${ENDPOINTS.SIGNUP}`,
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordType>({
      query: (data) => ({
        url: `${BASE_ROUTE.AUTH}${ENDPOINTS.RESET_PASSWORD}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation, useSignupMutation, useResetPasswordMutation } =
  authApiSlice;
