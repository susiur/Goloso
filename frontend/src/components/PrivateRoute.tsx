import React from 'react';
import { Navigate } from 'react-router-dom';

import { ReactNode } from 'react';

function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
