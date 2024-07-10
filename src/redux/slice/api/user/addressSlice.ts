import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "@/redux/slice/api/apiSlice";


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
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    address: builder.query<AddressDataResponse, string>({
      query: () => ({
        url: `${BASE_ROUTE.USER}${ENDPOINTS.ADDRESS}`,
        method: "GET",
      }),
      keepUnusedDataFor: 30,
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
  }),
});
export const {
  useAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useMarkAddressAsDefaultMutation,
} = authApiSlice;
