// ProtectedRoute.js
import React from 'react';
import { useNavigate} from 'react-router-dom';


const ProtectedRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    // If there's no token, navigate to the login page
    navigate('/login');
    // Returning null here ensures that nothing is rendered for this route
  }

  return <>{children}</>;
};

export default ProtectedRoute;
