import PaginationUi from "@/components/paginationUi";
import { SkeletonCard } from "@/components/skeletonCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useGetAllRideRequestQuery,
  useUpdateRideStatusMutation,
} from "@/redux/feature/driver/driver.api";
import type { IMetaData } from "@/types";
import { calculateDistance } from "@/utils/calculateDistance";
import { motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {};

const RideRequests: React.FC<Props> = () => {
  const [page, setPage] = useState(0);
  const { data: allRideRequests, isLoading: requestsLoading } =
    useGetAllRideRequestQuery({
      page,
      limit: 10,
    });
  const [requestAccept, { isLoading }] = useUpdateRideStatusMutation();
  const navigate = useNavigate();

  const handleAccept = async (id: string) => {
    console.log("Accepted ride:", id);
    const toastId = toast.loading("Accpeting...");
    try {
      const result = await requestAccept({
        status: "ACCEPTED",
        _id: id,
      }).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
        navigate("/driver/active-ride");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  if (requestsLoading) return <SkeletonCard />;

  console.log(allRideRequests);

  if (allRideRequests?.data.length === 0 || !allRideRequests) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto py-10 flex flex-col items-center justify-center">
          <Card className="p-6 text-center">
            <CardTitle>No Requests Found</CardTitle>
            <CardContent className="text-muted-foreground">
              You don&apos;t have any incoming ride requests right now.
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {allRideRequests.data.map((ride) => (
        <Card key={ride._id}>
          <CardHeader>
            <CardTitle>{(ride?.riderId as any).name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>📞 {ride.phone}</p>
            <p>💰 Cost: {ride.costOfRide} BDT</p>
            {/* <p>📍 Pickup: {ride.pickup}</p> */}
            <p>
              🏁 Distance:{" "}
              {calculateDistance(
                ride.location.from.lat,
                ride.location.from.lng,
                ride.location.to.lat,
                ride.location.to.lng
              ).toFixed(2)}
              km
            </p>
            <Separator className="my-2" />
            <div className="flex gap-2">
              <Button
                variant={"default"}
                onClick={() => handleAccept(ride._id)}
                disabled={isLoading}
              >
                Accept
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div>
        {(allRideRequests?.meta?.totalPage as number) > 1 && (
          <PaginationUi
            meta={allRideRequests.meta as IMetaData}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default RideRequests;
