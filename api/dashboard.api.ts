import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.mutation({
      query: () => ({
        url: "/dashboard/?timezone=Asia/Dhaka",
      }),
    }),
  }),
});

export const { useGetDashboardDataMutation } = dashboardApi;
