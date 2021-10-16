import React from "react";
import MobileNav from "../../components/MobileNav/MobileNav";
import MyProfile from "../../components/MyProfile/MyProfile";
import Posts from "../../components/MyProfile/Posts";
import ProfileHeader from "../../components/MyProfile/ProfileHeader";

const ProfilePage = () => {
  return (
    <div>
      <ProfileHeader />
      <MyProfile />
      <Posts />
      <MobileNav />
    </div>
  );
};

export default ProfilePage;
