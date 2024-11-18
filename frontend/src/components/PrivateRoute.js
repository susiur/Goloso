import React from 'react';
import { Navigate } from 'react-router-dom';
function PrivateRoute(_a) {
    var children = _a.children;
    var isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : React.createElement(Navigate, { to: "/login" });
}
export default PrivateRoute;
