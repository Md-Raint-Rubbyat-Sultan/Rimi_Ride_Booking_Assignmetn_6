import Profile from "@/pages/Profile";
import RideDetails from "@/pages/User/RideDetails";
import RideHistory from "@/pages/User/RideHistory";

export const userSidebarMenu = [
  {
    title: "User Managment",
    items: [
      {
        title: "Ride History",
        url: "/user/ride-history",
        Component: RideHistory,
      },
      {
        title: "Ride Details",
        url: "/user/ride-details",
        Component: RideDetails,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        Component: Profile,
      },
    ],
  },
];
