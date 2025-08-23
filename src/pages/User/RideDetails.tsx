import CancelRide from "@/components/modules/BookRide/CancelRide";
import { SkeletonDemo } from "@/components/skeletonRegular";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rideStatusSteps } from "@/constants/ride";
import { useGetRideDetailsQuery } from "@/redux/feature/ride/ride.api";
import { formatDate } from "@/utils/formatdate";
import { motion } from "framer-motion";
import { Car, Phone } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

type Props = {};

const RideDetails: React.FC<Props> = () => {
  const { data: rideDetails, isLoading } = useGetRideDetailsQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <SkeletonDemo />;

  const ride = rideDetails?.data;

  if (!ride) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto py-10 flex flex-col items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>No Request Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You don&apos;t have any active or past ride requests.
              </p>
              <Button onClick={() => navigate("/book-ride")}>
                Book a Ride
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Ride Info */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Cost of Ride:</span>
            <span className="font-semibold">৳ {ride?.costOfRide}</span>
          </div>
          <div className="flex justify-between">
            <span>Requested At:</span>
            <span>{formatDate(ride?.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{ride?.rideTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Status:</span>
            <Badge
              variant={
                ride?.rideStatus === "COMPLETED"
                  ? "default"
                  : ride?.rideStatus === "CANCELLED"
                  ? "destructive"
                  : "secondary"
              }
            >
              {ride?.rideStatus}
            </Badge>
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
            <AvatarImage src="" alt={ride?.riderId.name} />
            <AvatarFallback>{ride?.riderId.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{ride?.riderId.name}</p>
            <p className="text-sm text-muted-foreground">
              {ride?.riderId.email}
            </p>
            <p className="flex items-center gap-1 text-sm">
              <Phone className="w-4 h-4" /> {ride?.phone}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Driver Info */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Info</CardTitle>
        </CardHeader>
        <CardContent>
          {ride?.driverId ? (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="" alt={ride?.driverId.name} />
                <AvatarFallback>{ride?.driverId.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{ride.driverId.name}</p>
                <p className="flex items-center gap-1 text-sm">
                  <Phone className="w-4 h-4" /> {ride.driverId.phone}
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <Car className="w-4 h-4" /> {ride?.driverId.Vehicle}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No driver assigned yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rideStatusSteps.map((step, index) => {
              const isActive = step.key === ride?.rideStatus;
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
        </CardContent>
      </Card>
      {/* Cancel Ride */}
      <CancelRide />
    </div>
  );
};

export default RideDetails;
