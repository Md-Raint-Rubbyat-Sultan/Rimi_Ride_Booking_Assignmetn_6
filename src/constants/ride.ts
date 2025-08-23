import {
  MapPin,
  Clock,
  Car,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const rideStatusSteps = [
  { key: "REQUESTED", label: "Ride Requested", icon: Loader2 },
  { key: "ACCEPTED", label: "Driver Accepted", icon: Car },
  { key: "PICKED_UP", label: "On the Way", icon: Clock },
  { key: "IN_TRANSIT", label: "Transit on Cash", icon: MapPin },
  { key: "COMPLETED", label: "Ride Completed", icon: CheckCircle2 },
  { key: "CANCELLED", label: "Ride Cancelled", icon: XCircle },
];
