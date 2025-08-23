import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IResponse<IUser>, undefined>({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["user"],
    }),
    getAdmins: builder.query<IResponse<IUser[]>, undefined>({
      query: () => ({
        url: "/user/admins",
      }),
      providesTags: ["user"],
    }),
    login: builder.mutation<IResponse<string>, null>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const { useGetMeQuery, useGetAdminsQuery, useLoginMutation } = userApi;
