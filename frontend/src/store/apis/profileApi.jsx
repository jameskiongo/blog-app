import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const profileApi = createApi({
  reducerPath: "profile",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/profile/",
    fetchFn: async (...args) => {
      //remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (slug) => ({
        url: `${slug}/`,
        method: "GET",
      }),
    }),

    //   register: builder.mutation({
    //     query: (data) => ({
    //       url: "auth/register/",
    //       method: "POST",
    //       body: data,
    //     }),
    //   }),
  }),
});
export const { useGetProfileQuery } = profileApi;
export { profileApi };
