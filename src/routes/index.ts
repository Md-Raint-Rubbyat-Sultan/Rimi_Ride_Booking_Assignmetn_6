import App from "@/App";
import BookRide from "@/pages/BookRide";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Unauthorized from "@/pages/Unauthorized";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { adminSidebarMenu } from "./adminSidebarMenu";
import { driverSidebarMenu } from "./driverSidebarMenu";
import { userSidebarMenu } from "./userSidebarMenu";

const DashboardLayout = lazy(
  () => import("@/components/Layouts/DashboardLayout")
);
const Register = lazy(() => import("@/pages/Register"));
const About = lazy(() => import("@/pages/About"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Features = lazy(() => import("@/pages/Features"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "features",
        Component: Features,
      },
      {
        path: "contacts",
        Component: Contacts,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "book-ride",
        Component: withAuth(BookRide),
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, ["ADMIN"]),
    children: generateRoutes(adminSidebarMenu),
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, ["USER"]),
    children: generateRoutes(userSidebarMenu),
  },
  {
    path: "/driver",
    Component: withAuth(DashboardLayout, ["DRIVER"]),
    children: generateRoutes(driverSidebarMenu),
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
