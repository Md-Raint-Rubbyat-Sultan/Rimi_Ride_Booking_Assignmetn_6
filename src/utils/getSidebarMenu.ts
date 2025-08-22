import { adminSidebarMenu } from "@/routes/adminSidebarMenu";
import { driverSidebarMenu } from "@/routes/driverSidebarMenu";
import { userSidebarMenu } from "@/routes/userSidebarMenu";

export const getSidebarMenu = (role: string) => {
  switch (role) {
    case "ADMIN":
      return adminSidebarMenu;
    case "USER":
      return userSidebarMenu;
    case "DRIVER":
      return driverSidebarMenu;
    default:
      return [];
  }
};
