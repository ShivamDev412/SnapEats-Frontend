import { BASE_ROUTE, ENDPOINTS } from "@/utils/Endpoints";
import { apiSlice } from "../apiSlice";
import { AuthResponse } from "./profileSlice";
export type OverviewMatricesType = {
  numberOfOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
};
type MostOrderItemsType = {
  name: string;
  quantity: number;
  id: string;
};
export type OrderStatusType = {
  lastWeekOrders: number;
  lastMonthOrders: number;
  lastThreeMonthsOrders: number;
  lastSixMonthsOrders: number;
  lastYearOrders: number;
  mostOrderedItems: MostOrderItemsType[];
};
export type RevenueTrendsType = {
  date: string;
  revenue: number;
};
export const storeDashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewMatrices: builder.query<
      AuthResponse<OverviewMatricesType>,
      void
    >({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.OVERVIEW_METRICS}`,
        method: "GET",
      }),
    }),
    getOrderStats: builder.query<AuthResponse<OrderStatusType>, void>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.ORDER_STATS}`,
        method: "GET",
      }),
    }),
    getRevenueTrends: builder.query<AuthResponse<RevenueTrendsType[]>, void>({
      query: () => ({
        url: `${BASE_ROUTE.STORE}${ENDPOINTS.REVENUE_TRENDS}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetOverviewMatricesQuery,
  useGetOrderStatsQuery,
  useGetRevenueTrendsQuery,
} = storeDashboardApiSlice;
