import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Device from "expo-device";
import { Platform } from "react-native";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState }) => {

      const deviceName = Device.modelName;
      const brand = Device.brand;

      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set(
         "User-Agent",
         `${brand}, ${deviceName}, ${Platform.OS}`
      );
      return headers;
    },
  }),
  tagTypes: ['Topics'],
  endpoints: () => ({}),
});
