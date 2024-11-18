'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Coffee, Globe, Heart, ShoppingBag, Users } from 'lucide-react';
import React from "react";
import { useNavigate } from 'react-router-dom';
export default function Home() {
    var navigate = useNavigate();
    var _a = useState(false), isAuthenticated = _a[0], setIsAuthenticated = _a[1];
    useEffect(function () {
        // Simula la verificación de autenticación, usando el token almacenado en localStorage.
        var token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);
    return (React.createElement("div", { className: "min-h-screen bg-background" },
        React.createElement("main", { className: "container mx-auto px-4 py-16" }, isAuthenticated ? (React.createElement("main", { className: "container mx-auto px-4 py-16" },
            React.createElement("section", { className: "text-center mb-16" },
                React.createElement("h2", { className: "text-4xl font-bold mb-4 text-accent" }, "Bienvenido a El Goloso"),
                React.createElement("p", { className: "text-xl mb-8 text-muted-foreground" }, "\"Descubre nuestra deliciosa selecci\u00F3n de productos de calidad\"")),
            React.createElement("section", { className: "grid md:grid-cols-3 gap-8" },
                React.createElement("div", { className: "bg-card rounded-lg p-6 shadow-md" },
                    React.createElement(Coffee, { className: "w-12 h-12 text-accent mb-4" }),
                    React.createElement("h3", { className: "text-2xl font-semibold mb-2 text-accent" }, "Productos de calidad"),
                    React.createElement("p", { className: "text-muted-foreground" }, "Ofrecemos una amplia gama de productos de calidad cuidadosamente seleccionados.")),
                React.createElement("div", { className: "bg-card rounded-lg p-6 shadow-md" },
                    React.createElement(Users, { className: "w-12 h-12 text-accent mb-4" }),
                    React.createElement("h3", { className: "text-2xl font-semibold mb-2 text-accent" }, "Proveedores confiables"),
                    React.createElement("p", { className: "text-muted-foreground" }, "Trabajamos con los mejores proveedores para garantizar la calidad de nuestros productos.")),
                React.createElement("div", { className: "bg-card rounded-lg p-6 shadow-md" },
                    React.createElement(ShoppingBag, { className: "w-12 h-12 text-accent mb-4" }),
                    React.createElement("h3", { className: "text-2xl font-semibold mb-2 text-accent" }, "Experiencia \u00FAnica"),
                    React.createElement("p", { className: "text-muted-foreground" }, "Disfruta de una experiencia de compra \u00FAnica con nuestros productos exclusivos."))))) : (React.createElement("div", { className: "min-h-screen bg-background" },
            React.createElement("main", { className: "container mx-auto px-4 py-16" },
                React.createElement("section", { className: "text-center mb-16" },
                    React.createElement("h2", { className: "text-4xl font-bold mb-4 text-accent" }, "Bienvenido a Esperanza para Todos"),
                    React.createElement("p", { className: "text-xl mb-8 text-muted-foreground" }, "Unidos por la solidaridad y el compromiso de un mundo mejor"),
                    React.createElement(Button, { size: "lg", onClick: function () { return navigate('/login'); } },
                        "Conoce nuestros proyectos",
                        React.createElement(Globe, { className: "ml-2" }))),
                React.createElement("section", { className: "grid md:grid-cols-3 gap-8" },
                    React.createElement("div", { className: "bg-card rounded-lg p-6 shadow-md" },
                        React.createElement(Heart, { className: "w-12 h-12 text-accent mb-4" }),
                        React.createElement("h3", { className: "text-2xl font-semibold mb-2 text-accent" }, "Apoyo Humanitario"),
                        React.createElement("p", { className: "text-muted-foreground" }, "Proporcionamos ayuda vital a las comunidades que m\u00E1s lo necesitan en todo el mundo.")),
                    React.createElement("div", { className: "bg-card rounded-lg p-6 shadow-md" },
                        React.createElement(Users, { className: "w-12 h-12 text-accent mb-4" }),
                        React.createElement("h3", { className: "text-2xl font-semibold mb-2 text-accent" }, "Empoderamiento Comunitario"),
                        React.createElement("p", { className: "text-muted-foreground" }, "Trabajamos junto a las comunidades para fortalecer su capacidad de autosuficiencia.")),
                    React.createElement("div", { className: "bg-card rounded-lg p-6 shadow-md" },
                        React.createElement(Globe, { className: "w-12 h-12 text-accent mb-4" }),
                        React.createElement("h3", { className: "text-2xl font-semibold mb-2 text-accent" }, "Impacto Global"),
                        React.createElement("p", { className: "text-muted-foreground" }, "Promovemos iniciativas que generan un impacto duradero y positivo a nivel mundial.")))),
            React.createElement("footer", { className: "bg-card mt-16 py-8" },
                React.createElement("div", { className: "container mx-auto px-4 text-center text-muted-foreground" },
                    React.createElement("p", null, "\u00A9 2023 Esperanza para Todos. Todos los derechos reservados."))))))));
}
