import React from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { IUser } from "@/types";

type Props = {
  user: IUser;
};

const ProfileCard: React.FC<Props> = ({ user }) => {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.picture || ""} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex gap-2 mt-2">
            {user.isActive && (
              <Badge
                variant={
                  user.isActive === "ACTIVE"
                    ? "default"
                    : user.isActive === "BLOCKED"
                    ? "destructive"
                    : "secondary"
                }
              >
                {user.isActive}
              </Badge>
            )}
            {user.isVerified && <Badge variant="default">Verified</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Role:</span>
          <span>{user.role}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Phone:</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Address:</span>
          <span>{user.address || "N/A"}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Vehicle:</span>
          <span>{user.Vehicle || "N/A"}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Auth Provider:</span>
          <span>{user.auth.map((a) => a.provider).join(", ")}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Joined:</span>
          <span>
            {user.createdAt ? format(new Date(user.createdAt), "PPpp") : "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
