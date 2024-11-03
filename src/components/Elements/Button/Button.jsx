import React from 'react';

const Button = ({ children, classname, value, onClick, disabled }) => {
  return (
    <button
      className={`${classname}  w-full h-10 rounded-md`}
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
