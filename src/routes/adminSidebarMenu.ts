import AnalyticsDashboard from "@/pages/Admin/AnalyticsDashboard";
import RideOversite from "@/pages/Admin/RideOversite";
import UserManagement from "@/pages/Admin/UserManagement";
import Profile from "@/pages/Profile";
import RideDetails from "@/pages/User/RideDetails";

export const adminSidebarMenu = [
  {
    title: "User Management",
    items: [
      {
        title: "Usre Management",
        url: "/admin/user-management",
        Component: UserManagement,
      },
      {
        title: "Ride Oversite",
        url: "/admin/ride-oversite",
        Component: RideOversite,
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Analytics Dashboard",
        url: "/admin/analytics-dashboard",
        Component: AnalyticsDashboard,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Ride Details",
        url: "/admin/ride-details",
        Component: RideDetails,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        Component: Profile,
      },
    ],
  },
];
