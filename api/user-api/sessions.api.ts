import { baseApi } from "../baseApi";

export const sessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => "/auth/sessions/",
    }),
    logOutOtherDevice: builder.mutation({
      query: (body) => ({
        url: `/auth/logout-session/${body.id}/`,
        method: "POST",
        body,
      }),
    }),
    logOutAll: builder.mutation({
      query: (body) => ({
        url: `/auth/logout-all-sessions/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useLogOutOtherDeviceMutation,
  useLogOutAllMutation,
} = sessionsApi;
