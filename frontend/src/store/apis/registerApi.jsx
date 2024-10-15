import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const registerApi = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    fetchFn: async (...args) => {
      //remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useRegisterMutation } = registerApi;
export { registerApi };
