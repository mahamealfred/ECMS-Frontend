import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Simulating authentication check
const isAuthenticated = true; // Assume true if authenticated

function PrivateRoute({ element, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" replace />}
    />
  );
}

export default PrivateRoute;
