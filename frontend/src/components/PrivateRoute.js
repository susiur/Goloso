import React from 'react';
import { Navigate } from 'react-router-dom';
function PrivateRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : React.createElement(Navigate, { to: "/login" });
}
export default PrivateRoute;
