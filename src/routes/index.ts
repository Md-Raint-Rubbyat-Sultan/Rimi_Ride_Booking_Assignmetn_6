import App from "@/App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { generateRoutes } from "@/utils/generateRoutes";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { adminSidebarMenu } from "./adminSidebarMenu";
import { userSidebarMenu } from "./userSidebarMenu";
import { driverSidebarMenu } from "./driverSidebarMenu";

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
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: generateRoutes(adminSidebarMenu),
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: generateRoutes(userSidebarMenu),
  },
  {
    path: "/driver",
    Component: DashboardLayout,
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
]);
