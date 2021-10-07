import React from "react";
import { Link as NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <div>
      <nav className="mobileNav">
        <div>
          <NavLink to="/home" className="mobileNavLink">
            Home
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            Search
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            Upload
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            Activity
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            Profile
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
