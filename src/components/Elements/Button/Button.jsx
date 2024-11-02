import React from 'react';

const Button = ({ children, classname }) => {
  return (
    <button className={`${classname}  w-full h-10 rounded-md`}>
      {children}
    </button>
  );
};

export default Button;
