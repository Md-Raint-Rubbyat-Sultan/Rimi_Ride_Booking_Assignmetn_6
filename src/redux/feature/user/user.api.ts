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
    updateUser: builder.mutation<
      IResponse<Partial<IUser>>,
      Partial<IUser> & { _id: string }
    >({
      query: ({ _id, ...rest }) => ({
        url: `/user/${_id}`,
        method: "PATCH",
        data: rest,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetMeQuery, useGetAdminsQuery, useUpdateUserMutation } =
  userApi;
