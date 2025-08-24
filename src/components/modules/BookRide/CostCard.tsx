import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ILoaction, LatLng } from "@/types/BookRide/rideTypes";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useBookRideMutation } from "@/redux/feature/ride/ride.api";
import { useNavigate } from "react-router";

type Props = {
  amount: number;
  distance: number;
  start: LatLng | null;
  end: LatLng | null;
};

const CostCard: React.FC<Props> = ({ amount, distance, start, end }) => {
  const [bookRide, { isLoading }] = useBookRideMutation();
  const navigate = useNavigate();

  const handleAmount = async () => {
    const toastId = toast.loading("Booking ride...");
    const location: ILoaction = {
      from: {
        lat: start?.lat || 0,
        lng: start?.lng || 0,
      },
      to: {
        lat: end?.lat || 0,
        lng: end?.lng || 0,
      },
    };

    try {
      if (amount > 0 && distance > 0) {
        const result = await bookRide(location).unwrap();
        if (result.success) {
          toast.success(result.message, { id: toastId });
          navigate("/user/ride-details");
        }
      } else {
        toast.error("Invalid Request!", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <motion.div
      className="px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 w-full md:w-auto">
        <span className="text-lg font-semibold">
          Cost: ৳ {amount.toFixed(2)}
        </span>
        <span className="text-lg font-semibold">
          Distance: {distance.toFixed(2)}km
        </span>
        <Button onClick={handleAmount} type="button" disabled={isLoading}>
          Request Ride {isLoading && <Loader className="animate-spin" />}
        </Button>
      </Card>
    </motion.div>
  );
};

export default CostCard;
