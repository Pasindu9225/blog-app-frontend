import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { path: "/", name: "Home" },
  { path: "/crypto", name: "Crypto" },
  { path: "/blog", name: "Blog" },
  { path: "/submit", name: "Submit" },
];

const Navbar = ({ containerStyles }) => {
  return (
    <nav className={containerStyles}>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive ? "active_link text-blue-500" : ""
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
