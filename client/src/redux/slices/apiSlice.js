import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_APP_BASE_URL + "/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include", // ✅ this allows sending cookies with every request
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
