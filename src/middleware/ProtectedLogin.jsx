import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedLogin = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={'/home'} />;
  }

  return children;
};

export default ProtectedLogin;
