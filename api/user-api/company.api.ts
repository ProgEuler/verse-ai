import { baseApi } from "../baseApi";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCompany: builder.mutation({
      query: (body) => ({
        url: `/auth/company/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    addOpenningHour: builder.mutation({
      query: (body) => ({
        url: "/opening-hours/",
        method: "POST",
        body,
      }),
    }),
    getServices: builder.query({ query: () => "/auth/company/service/" }),
    getOpeningHours: builder.query({ query: () => "/opening-hours/" }),
  }),
});

export const {
  useUpdateCompanyMutation,
  useAddOpenningHourMutation,
  useGetServicesQuery,
  useGetOpeningHoursQuery
} = companyApi;
