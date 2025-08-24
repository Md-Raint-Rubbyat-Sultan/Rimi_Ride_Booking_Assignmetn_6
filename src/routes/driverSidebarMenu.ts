import ActiveRide from "@/pages/Driver/ActiveRide";
import Availability from "@/pages/Driver/Availability";
import Earnings from "@/pages/Driver/Earnings";
import RideRequests from "@/pages/Driver/RideRequests";
import Profile from "@/pages/Profile";
import RideDetails from "@/pages/User/RideDetails";
import RideHistory from "@/pages/User/RideHistory";

export const driverSidebarMenu = [
  {
    title: "Drive Management",
    items: [
      {
        title: "Ride Requests",
        url: "/driver/ride-requests",
        Component: RideRequests,
      },
      {
        title: "Active Ride",
        url: "/driver/active-ride",
        Component: ActiveRide,
      },
      {
        title: "Availability",
        url: "/driver/avalilability",
        Component: Availability,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Ride Details",
        url: "/driver/ride-details",
        Component: RideDetails,
      },
      {
        title: "Eranings",
        url: "/driver/earnings",
        Component: Earnings,
      },
      {
        title: "Reide History",
        url: "/driver/driver-history",
        Component: RideHistory,
      },
      {
        title: "Profile",
        url: "/driver/profile",
        Component: Profile,
      },
    ],
  },
];
