import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helper/getBaseQueryWithReauth";

const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "posts/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Posts", id })), "Posts"]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `posts/${id}`,
        method: "GET",
      }),
      providesTags: (result, id) => [{ type: "Post", id }],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "posts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPostComments: builder.query({
      query: (id) => ({
        url: `post/${id}/comment/`,
        method: "GET",
      }),
      // providesTags: (result, id) => [{ type: "Post", id }],
      providesTags: (result, error, id) => [{ type: "PostComments", id }],
    }),
    createPostComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `post/${id}/comment/`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: (result, { id }) => [{ type: "Post", id }],
      invalidatesTags: (result, error, { id }) => [
        { type: "PostComments", id },
      ],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetPostCommentsQuery,
  useCreatePostCommentMutation,
} = postsApi;
export { postsApi };
