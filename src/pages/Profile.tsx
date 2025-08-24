import ChangePasswordModal from "@/components/modules/Profile/ChangePasswordModal";
import ProfileCard from "@/components/modules/Profile/ProfileCard";
import ToggelSwitch from "@/components/modules/Profile/switch";
import UpdateModal from "@/components/modules/Profile/UpdateModal";
import { SkeletonCard } from "@/components/skeletonCard";
import { useGetMeQuery } from "@/redux/feature/user/user.api";
import React from "react";

type Props = {};

const Profile: React.FC<Props> = () => {
  const { data: userInfo } = useGetMeQuery(undefined);

  const user = userInfo?.data;

  if (!user) return <SkeletonCard />;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-end items-center gap-2">
        {/* Update Profile Dialog */}
        <UpdateModal user={user} />
        {/* Change password */}
        <ChangePasswordModal />
        {/* Online switch */}
        <ToggelSwitch isOnline={user.isOnline || "ONLINE"} _id={user._id} />
      </div>
      {/* Profile Card */}
      <ProfileCard user={user} />
    </div>
  );
};

export default Profile;
