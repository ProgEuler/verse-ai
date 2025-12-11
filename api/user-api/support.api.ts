import { baseApi } from "../baseApi";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupport: builder.mutation({
      query: (body) => ({
        url: "/tickets/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateSupportMutation } = supportApi;
