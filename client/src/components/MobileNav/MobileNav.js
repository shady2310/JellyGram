import React from "react";
import { Link as NavLink } from "react-router-dom";
import { BiHomeAlt, BiMessageSquareAdd, BiUser, BiHeart, BiSearch } from "react-icons/bi";

const MobileNav = () => {
  return (
    <div>
      <nav className="mobileNav">
        <div>
          <NavLink to="/" className="mobileNavLink">
            <BiHomeAlt />
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            <BiSearch />
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            <BiMessageSquareAdd />
          </NavLink>

          <NavLink to="/" className="mobileNavLink">
            <BiHeart />
          </NavLink>

          <NavLink to="/profile" className="mobileNavLink">
            <BiUser/>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
