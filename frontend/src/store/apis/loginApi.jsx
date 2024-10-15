import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    fetchFn: async (...args) => {
      //remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation } = loginApi;
export { loginApi };
