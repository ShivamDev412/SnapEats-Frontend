import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "./profileSlice";
export type BankAccountType = {
  accountHolderName: string;
  accountNumber: string;
  email: string;
  transitNumber: string;
  currency: string;
  institutionNumber: string;
};
export type StripeAccountType = {
  id: string;
  object: string;
  business_type: string;
  capabilities: {
    card_payments: {
      requested: boolean;
    };
    transfers: {
      requested: boolean;
    };
  };
  email: string;
  individual: {
    first_name: string;
    last_name: string;
  };
  external_accounts: {
    object: string;
    data: Array<{
      id: string;
      object: string;
      bank_name: string;
      country: string;
      currency: string;
      last4: string;
      routing_number: string;
      status: string;
    }>;
  };
};
export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBankAccount: builder.mutation<AuthResponse, BankAccountType>({
      query: (bankAccount) => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.BANK_ACCOUNT}`,
        method: "POST",
        body: bankAccount,
      }),
      invalidatesTags: ["BankAccount"],
    }),
    getBankAccount: builder.query<AuthResponse<StripeAccountType>, void>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.BANK_ACCOUNT}`,
        method: "GET",
      }),
      providesTags: ["BankAccount"],
    }),
    unlinkBankAccount: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.BANK_ACCOUNT}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BankAccount"],
    }),
  }),
});
export const { useAddBankAccountMutation, useGetBankAccountQuery, useUnlinkBankAccountMutation } = storeApiSlice;
