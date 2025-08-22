import { baseApi } from "@/redux/baseApi";
import type {
  ICerateRequest,
  ICradentials,
  ILogin,
  IResponse,
  IUser,
} from "@/types";

export const auhtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IResponse<IUser>, ICerateRequest>({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<IResponse<ICradentials>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation<IResponse<null>, undefined>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useLogoutMutation } =
  auhtApi;
