import React from "react";
import { Link } from "react-router-dom";
import { BiCog } from "react-icons/bi";

const ProfileHeader = () => {
  return (
    <div className="profileHeader">
      <Link to="/config">
        <BiCog size="3em" />
      </Link>
      <Link></Link>
    </div>
  );
};

export default ProfileHeader;
