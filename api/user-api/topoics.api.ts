import { TopicItem } from "@/app/(user_dashboard)/business-topics";
import { baseApi } from "../baseApi";

export const topicsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<TopicItem[], void>({
      query: () => "/knowledge-base/"
    }),
  }),
});

export const { useGetTopicsQuery } = topicsApi;
