'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getRole, isAuthenticated } from '../utils/authUtils';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Coffee, Brain, Users, UserCircle, ChevronDown, LogOut, User, Truck, Home } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Navbar() {
    var navigate = useNavigate();
    var location = useLocation();
    var role = getRole() || ''; // Recuperamos el rol del usuario y proporcionamos un valor predeterminado si es null
    console.log(role);
    var authenticated = isAuthenticated(); // Verificamos si el usuario está autenticado
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var handleLogout = function () {
        localStorage.removeItem('token');
        navigate('/login');
    };
    // Filtramos los elementos del menú según el rol
    var navItems = __spreadArray([
        { name: 'Inicio', path: '/', icon: Home },
        { name: 'Productos', path: '/productos', icon: Brain },
        { name: 'Proveedores', path: '/proveedores', icon: Truck }
    ], (role.includes('admin') ? [{ name: 'Clientes', path: '/clientes', icon: Users }] : []), true);
    // Filtramos los elementos solo si el usuario está autenticado
    var filteredNavItems = authenticated
        ? navItems
        : navItems.filter(function (item) { return item.name === 'Inicio'; }); // Solo mostramos "Inicio" si no está autenticado
    return (React.createElement("nav", { className: "bg-primary text-primary-foreground border-b border-primary/20 sticky top-0 z-50" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("div", { className: "flex justify-between items-center h-16" },
                React.createElement(Link, { to: "/", className: "flex items-center space-x-3" },
                    React.createElement(Coffee, { className: "h-8 w-8 text-primary-foreground" }),
                    React.createElement("span", { className: "text-2xl font-bold text-primary-foreground" }, authenticated ? 'El Goloso' : 'Esperanza para todos')),
                React.createElement("div", { className: "hidden md:flex space-x-4" }, filteredNavItems.map(function (item) { return (React.createElement(Link, { key: item.name, to: item.path, className: "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out\n                  ".concat(location.pathname === item.path
                        ? 'bg-primary-foreground text-primary'
                        : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground') },
                    React.createElement(item.icon, { className: "w-5 h-5 mr-2" }),
                    item.name)); })),
                React.createElement("div", { className: "flex items-center space-x-4" }, authenticated ? (React.createElement(DropdownMenu, null,
                    React.createElement(DropdownMenuTrigger, { asChild: true },
                        React.createElement(Button, { variant: "secondary", className: "flex items-center space-x-1 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20" },
                            React.createElement(UserCircle, { className: "w-5 h-5" }),
                            React.createElement("span", null, "Mi Cuenta"),
                            React.createElement(ChevronDown, { className: "w-4 h-4" }))),
                    React.createElement(DropdownMenuContent, { align: "end", className: "w-56 bg-primary text-primary-foreground" },
                        React.createElement(DropdownMenuLabel, null, "Mi Cuenta"),
                        React.createElement(DropdownMenuSeparator, { className: "bg-primary-foreground/20" }),
                        role === 'admin' && (React.createElement(DropdownMenuItem, { asChild: true },
                            React.createElement(Link, { to: "/admin", className: "flex items-center hover:bg-primary-foreground/10" },
                                React.createElement(Brain, { className: "w-4 h-4 mr-2" }),
                                "Panel de Admin"))),
                        React.createElement(DropdownMenuItem, { asChild: true },
                            React.createElement(Link, { to: "/profile", className: "flex items-center hover:bg-primary-foreground/10" },
                                React.createElement(User, { className: "w-4 h-4 mr-2" }),
                                "Perfil")),
                        React.createElement(DropdownMenuItem, { onClick: handleLogout, className: "text-red-300 hover:bg-primary-foreground/10" },
                            React.createElement(LogOut, { className: "w-4 h-4 mr-2" }),
                            "Cerrar sesi\u00F3n")))) : (React.createElement(React.Fragment, null,
                    React.createElement(Button, { asChild: true, variant: "ghost", className: "text-primary-foreground hover:bg-primary-foreground/10" },
                        React.createElement(Link, { to: "/login" }, "Iniciar sesi\u00F3n")),
                    React.createElement(Button, { asChild: true, className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90" },
                        React.createElement(Link, { to: "/register" }, "Registrarse"))))),
                React.createElement("div", { className: "md:hidden" },
                    React.createElement(Button, { variant: "ghost", onClick: function () { return setIsOpen(!isOpen); }, className: "text-primary-foreground" },
                        React.createElement("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" })))))),
        React.createElement(motion.div, { className: "md:hidden", initial: "closed", animate: isOpen ? "open" : "closed", variants: {
                open: { opacity: 1, height: "auto" },
                closed: { opacity: 0, height: 0 }
            }, transition: { duration: 0.3, ease: "easeInOut" } },
            React.createElement("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3" }, filteredNavItems.map(function (item) { return (React.createElement(Link, { key: item.name, to: item.path, className: "flex items-center px-3 py-2 rounded-md text-base font-medium ".concat(location.pathname === item.path
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'), onClick: function () { return setIsOpen(false); } },
                React.createElement(item.icon, { className: "w-5 h-5 mr-2" }),
                item.name)); })))));
}
