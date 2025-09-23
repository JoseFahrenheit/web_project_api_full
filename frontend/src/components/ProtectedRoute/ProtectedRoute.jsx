import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, loggedIn, userEmail, onLogout, ...props }) => {
  console.log('ProtectedRoute - loggedIn:', loggedIn);
  console.log('ProtectedRoute - userEmail:', userEmail);

  return loggedIn ? (
    <Component
      {...props}
      userEmail={userEmail}
      onLogout={onLogout}
    />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;