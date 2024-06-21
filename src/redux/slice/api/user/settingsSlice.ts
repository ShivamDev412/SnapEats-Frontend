import { apiSlice } from "../apiSlice";
import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { AuthResponse } from "../store/profileSlice";
export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export const settingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeLanguage: builder.mutation<AuthResponse, string>({
      query: (lang) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CHANGE_LANGUAGE}/${lang}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<AuthResponse, ChangePasswordType>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.CHANGE_PASSWORD}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const { useChangeLanguageMutation, useChangePasswordMutation } = settingsSlice;
