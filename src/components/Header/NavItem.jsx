import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ title, href, className }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive
          ? `  text-red-500 ${className}`
          : ` hover:text-red-600 transition-colors duration-300 ${className}`
      }
    >
      {title}
    </NavLink>
  );
};

export default NavItem;
