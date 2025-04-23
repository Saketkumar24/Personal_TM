import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = import.meta.env.VITE_APP_BASE_URL + "/api";
// const API_URL = "http://localhost:8800/api";
// const API_URL = ;


// const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://personal-tm.onrender.com/api", // or your deployed URL
    credentials: "include",               // ✅ this ensures cookies are sent
  }),
  endpoints: () => ({}),
});