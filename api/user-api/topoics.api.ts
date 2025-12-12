import { TopicItem } from "@/app/(user_dashboard)/business-topics";
import { baseApi } from "../baseApi";

export const topicsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<TopicItem[], void>({
      query: () => "/knowledge-base/",
      providesTags: ['Topics'],
    }),
    createTopic: builder.mutation({
      query: (body) => ({
        url: "/knowledge-base/",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Topics'],
    }),
  }),
});

export const { useGetTopicsQuery, useCreateTopicMutation } = topicsApi;
