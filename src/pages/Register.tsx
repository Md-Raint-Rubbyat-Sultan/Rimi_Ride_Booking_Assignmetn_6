import Logo from "@/assets/icons/Logo";
import React from "react";
import { Link, Navigate } from "react-router";
import registerImg from "@/assets/images/register.jpg";
import RegisterForm from "@/components/modules/Authentication/RegsterForm";
import { useGetMeQuery } from "@/redux/feature/user/user.api";
import { SkeletonCard } from "@/components/skeletonCard";

type Props = {};

const Register: React.FC<Props> = () => {
  const { data: user, isLoading: userLoading } = useGetMeQuery(undefined);

  if (userLoading) return <SkeletonCard />;

  if (user) return <Navigate to={"/"} replace={true} />;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src={registerImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to={"/"} className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
