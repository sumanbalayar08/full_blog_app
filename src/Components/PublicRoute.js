// PublicRoute.js
import React, { useContext } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';

const PublicRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate=useNavigate();
  
  if (token) {
    navigate('/', { state: { from: location } });
    return null; // or Loading component if needed
  }

  return <>{children}</>; // Render children directly
};

export default PublicRoute;
