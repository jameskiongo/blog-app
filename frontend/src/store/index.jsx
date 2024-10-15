import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { registerApi } from "./apis/registerApi";
import { loginApi } from "./apis/loginApi";
import {
  useGetUserMeQuery,
  useUpdateUserMutation,
  userApi,
} from "./apis/userApi";
import {
  useCreatePostMutation,
  useGetPostsQuery,
  postsApi,
  useGetSinglePostQuery,
  useGetPostCommentsQuery,
  useCreatePostCommentMutation,
} from "./apis/postsApi";
import { profileApi } from "./apis/profileApi";

export const store = configureStore({
  reducer: {
    [registerApi.reducerPath]: registerApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registerApi.middleware)
      .concat(loginApi.middleware)
      .concat(postsApi.middleware)
      .concat(profileApi.middleware)
      .concat(userApi.middleware),
});
setupListeners(store.dispatch);

export { useRegisterMutation } from "./apis/registerApi";
export { useLoginMutation } from "./apis/loginApi";
export { useGetProfileQuery } from "./apis/profileApi";
export {
  useGetPostsQuery,
  useCreatePostCommentMutation,
  useGetSinglePostQuery,
  useGetPostCommentsQuery,
  useCreatePostMutation,
  useGetUserMeQuery,
  useUpdateUserMutation,
};
