import Navbar from '@/components/Navbar';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import Productos from './pages/Productos';
import Proveedores from './pages/Proveedores';
import Clientes from './pages/Clientes';
function App() {
    return (React.createElement(Router, null,
        React.createElement(Navbar, null),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
            React.createElement(Route, { path: "/login", element: React.createElement(LoginForm, null) }),
            React.createElement(Route, { path: "/register", element: React.createElement(RegisterForm, null) }),
            React.createElement(Route, { path: "/productos", element: React.createElement(PrivateRoute, null,
                    React.createElement(Productos, null)) }),
            React.createElement(Route, { path: "/proveedores", element: React.createElement(PrivateRoute, null,
                    React.createElement(Proveedores, null)) }),
            React.createElement(Route, { path: "/clientes", element: React.createElement(PrivateRoute, null,
                    React.createElement(Clientes, null)) }))));
}
export default App;
