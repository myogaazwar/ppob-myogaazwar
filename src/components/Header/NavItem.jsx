import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ title, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive
          ? 'w-fit text-end text-red-500'
          : 'w-fit text-end hover:text-red-600 transition-colors duration-300'
      }
    >
      {title}
    </NavLink>
  );
};

export default NavItem;
