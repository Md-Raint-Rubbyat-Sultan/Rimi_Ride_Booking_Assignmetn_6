import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

type Props = {};

const Unauthorized: React.FC<Props> = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized
      </h1>
      <p className="text-lg text-foreground mb-6">
        You don&apos;t have permission to view this page.
      </p>
      <Button asChild variant={"default"}>
        <Link to={"/"}>Go Back Home</Link>
      </Button>
    </div>
  );
};

export default Unauthorized;
