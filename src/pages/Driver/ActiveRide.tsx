import { SkeletonCard } from "@/components/skeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { rideStatusSteps } from "@/constants/ride";
import {
  useGetPendingRideRequestQuery,
  useUpdateRideStatusMutation,
} from "@/redux/feature/driver/driver.api";
import { formatDate } from "@/utils/formatdate";
import { Phone } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { toast } from "sonner";

type Props = {};

const ActiveRide: React.FC<Props> = () => {
  const { data, isLoading } = useGetPendingRideRequestQuery(undefined);
  const [requestAccept, { isLoading: requestLoading }] =
    useUpdateRideStatusMutation();

  const handleReject = async (id: string) => {
    console.log("Rejected ride:", id);
    const toastId = toast.loading("Rejecting...");
    try {
      const result = await requestAccept({
        status: "CANCELLED",
        _id: id,
      }).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  const handelRequest = async (
    id: string,
    status:
      | "REQUESTED"
      | "ACCEPTED"
      | "PICKED_UP"
      | "IN_TRANSIT"
      | "COMPLETED"
      | "CANCELLED"
  ) => {
    const toastId = toast.loading(`${status}...`);
    try {
      const result = await requestAccept({
        _id: id,
        status,
      }).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  if (isLoading) return <SkeletonCard />;

  if (!data?.data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto py-10 flex flex-col items-center justify-center">
          <Card className="p-6 text-center">
            <CardTitle>No Pending Requests Found</CardTitle>
            <CardContent className="text-muted-foreground">
              You don&apos;t have any pending ride right now.
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  console.log(data);
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rideStatusSteps.map((step, index) => {
              const isActive = step.key === data?.data.rideStatus;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`${
                      isActive
                        ? "font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <Separator className="my-2" />
          <div className="flex items-center gap-4">
            {/* Others button */}
            {rideStatusSteps.map(
              (ride, idx) =>
                ride.key === data.data.rideStatus &&
                rideStatusSteps[idx + 1]?.key && (
                  <Button
                    key={idx}
                    onClick={() =>
                      handelRequest(
                        data.data._id,
                        rideStatusSteps[idx + 1]?.key as
                          | "REQUESTED"
                          | "ACCEPTED"
                          | "PICKED_UP"
                          | "IN_TRANSIT"
                          | "COMPLETED"
                          | "CANCELLED"
                      )
                    }
                  >
                    {rideStatusSteps[idx + 1].key}
                  </Button>
                )
            )}

            {/* rejecttion button */}
            {data?.data.rideStatus === "ACCEPTED" && (
              <Button
                variant="secondary"
                onClick={() => handleReject(data?.data._id)}
                disabled={requestLoading}
              >
                Reject
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rider Info */}
      <Card>
        <CardHeader>
          <CardTitle>Rider Info</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="" alt={data?.data.riderId.name} />
            <AvatarFallback>{data?.data.riderId.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{data?.data.riderId.name}</p>
            <p className="text-sm text-muted-foreground">
              {data?.data.riderId.email}
            </p>
            <p className="flex items-center gap-1 text-sm">
              <Phone className="w-4 h-4" /> {data?.data.phone}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ride Info */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Cost of Ride:</span>
            <span className="font-semibold">৳ {data?.data.costOfRide}</span>
          </div>
          <div className="flex justify-between">
            <span>Requested At:</span>
            <span>{formatDate(data?.data.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{data?.data.rideTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Status:</span>
            <Badge
              variant={
                data?.data.rideStatus === "COMPLETED"
                  ? "default"
                  : data?.data.rideStatus === "CANCELLED"
                  ? "destructive"
                  : "secondary"
              }
            >
              {data?.data.rideStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveRide;
