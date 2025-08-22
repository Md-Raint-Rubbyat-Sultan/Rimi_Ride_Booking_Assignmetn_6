import { useGetMeQuery } from "@/redux/feature/user/user.api";
import type { Role } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (
  Component: ComponentType,
  requiredRole?: Role[] | undefined
) => {
  const AuthWrapper = () => {
    const location = useLocation();
    const { data, isLoading } = useGetMeQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to={"/login"} state={{ path: location.pathname }} />;
    }

    if (
      requiredRole &&
      !isLoading &&
      data?.data?.role &&
      !requiredRole.includes(data.data.role)
    ) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
  return AuthWrapper;
};
