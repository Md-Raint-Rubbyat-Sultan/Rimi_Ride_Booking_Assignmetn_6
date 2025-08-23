import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { rideApi, useCancelRideMutation } from "@/redux/feature/ride/ride.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/hooks";

type Props = {};

const CancelRide: React.FC<Props> = () => {
  const [cancelRequest, { isLoading }] = useCancelRideMutation(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handelCancel = async () => {
    const toastId = toast.loading("Loged In...");
    try {
      const result = await cancelRequest(undefined).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
        navigate("/");
        dispatch(rideApi.util.resetApiState());
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel Ride</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will cancel your requested ride.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handelCancel} disabled={isLoading}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelRide;
