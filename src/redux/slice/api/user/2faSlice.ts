import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "../store/profileSlice";
export type TwoFAResponseType = {
  qrCode: string;
};
export type TwoFaStatusType = {
  twoFactorStatus: boolean;
};
export const twoFaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enable2FA: builder.mutation<AuthResponse<TwoFAResponseType>, void>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ENABLE_2FA}`,
        method: "POST",
      }),
      invalidatesTags: ["2FAStatus"],
    }),
    disable2FA: builder.mutation<AuthResponse<TwoFAResponseType>, void>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.DISABLE_2FA}`,
        method: "POST",
      }),
      invalidatesTags: ["2FAStatus"],
    }),
    get2FAStatus: builder.query<AuthResponse<TwoFaStatusType>, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.TWO_FA_STATUS}`,
        method: "GET",
      }),
      providesTags: ["2FAStatus"],
    }),
    verify2FA: builder.mutation<AuthResponse, { token: string }>({
      query: (data) => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.VERIFY_2FA}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["2FAStatus"],
    }),
  }),
});
export const {
  useEnable2FAMutation,
  useDisable2FAMutation,
  useVerify2FAMutation,
  useLazyGet2FAStatusQuery,
  useGet2FAStatusQuery,
} = twoFaApiSlice;
