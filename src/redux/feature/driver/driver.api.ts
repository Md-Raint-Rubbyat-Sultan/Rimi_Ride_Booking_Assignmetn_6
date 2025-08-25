import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRideDetails, IRideRequest, IUser } from "@/types";

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
    getAllRideRequest: builder.query<IResponse<IRideRequest[]>, unknown>({
      query: (params) => ({
        url: "/driver/get-ride-request",
        params,
      }),
      providesTags: ["driver"],
    }),
    getPendingRideRequest: builder.query<IResponse<IRideDetails>, undefined>({
      query: () => ({
        url: "/driver/pending-ride",
      }),
      providesTags: ["driver"],
    }),
    updateRideStatus: builder.mutation<
      IResponse<Partial<IRideDetails>>,
      {
        status:
          | "REQUESTED"
          | "ACCEPTED"
          | "PICKED_UP"
          | "IN_TRANSIT"
          | "COMPLETED"
          | "CANCELLED";
      } & { _id: string }
    >({
      query: ({ _id, status }) => ({
        url: `driver/request/${_id}`,
        method: "PATCH",
        data: { status: status },
      }),
      invalidatesTags: ["driver"],
    }),
  }),
});

export const {
  useGetEarningHistoryQuery,
  useGetAllRideRequestQuery,
  useGetPendingRideRequestQuery,
  useUpdateRideStatusMutation,
} = driverApi;
