import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRideDetails, IUser } from "@/types";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarningHistory: builder.query<
      IResponse<{
        data: IRideDetails[];
        totalEarning: number;
        weeklyEarning: number;
        monthlyEarning: number;
      }>,
      undefined
    >({
      query: () => ({
        url: "/driver/earning-history",
      }),
      providesTags: ["driver"],
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

export const {
  useGetEarningHistoryQuery,
  useGetAdminsQuery,
  useUpdateUserMutation,
} = driverApi;
