import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helper/getBaseQueryWithReauth";
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const userApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getUserMe: builder.query({
      query: (slug) => ({
        url: `profile/${slug}/`,
        method: "GET",
      }),
      // providesTags: (result, error, slug) => [{ type: "User", id: slug }],
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `profile/update/${slug}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // invalidatesTags: (result, error, { slug }) => [{ type: "User", id: slug }],
    invalidatesTags: ["User"],
  }),
});
export const { useGetUserMeQuery, useUpdateUserMutation } = userApi;
export { userApi };
