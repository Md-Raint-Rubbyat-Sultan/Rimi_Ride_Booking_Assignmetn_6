import { baseApi } from "@/redux/baseApi";
import type { ILoaction, IResponse, IRideDetails, IRideRequest } from "@/types";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRideDetails: builder.query<IResponse<IRideDetails>, undefined>({
      query: () => ({
        url: "/ride/ride-details",
      }),
      providesTags: ["ride"],
    }),
    getRideHistory: builder.query<IResponse<IRideDetails[]>, unknown>({
      query: (params) => ({
        url: "/ride/history",
        params,
      }),
      providesTags: ["ride"],
    }),
    bookRide: builder.mutation<IResponse<IRideRequest>, ILoaction>({
      query: (location) => ({
        url: "/ride/request",
        method: "POST",
        data: { location },
      }),
    }),
    cancelRide: builder.mutation<IResponse<null>, undefined>({
      query: () => ({
        url: "/ride/cancel",
        method: "PATCH",
      }),
      invalidatesTags: ["ride"],
    }),
  }),
});

export const {
  useGetRideDetailsQuery,
  useGetRideHistoryQuery,
  useBookRideMutation,
  useCancelRideMutation,
} = rideApi;
