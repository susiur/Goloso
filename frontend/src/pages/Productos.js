'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
const qualityColors = {
    Low: 'bg-red-100 text-red-600',
    Medium: 'bg-yellow-100 text-yellow-600',
    High: 'bg-green-100 text-green-600',
};
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
};
function fetchProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        const access_token = localStorage.getItem('token');
        if (!access_token) {
            throw new Error('No se encontró token de acceso');
        }
        const response = yield fetch('http://localhost:3000/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }
        return response.json();
    });
}
export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState('All');
    useEffect(() => {
        fetchProductos()
            .then(setProductos)
            .catch(() => setError('Error al cargar los productos'))
            .finally(() => setLoading(false));
    }, []);
    const handleQualityChange = (quality) => {
        setSelectedQuality(quality);
    };
    // Filtrar productos según la calidad seleccionada
    const filteredProductos = selectedQuality === 'All'
        ? productos
        : productos.filter(producto => producto.quality === selectedQuality);
    if (loading) {
        return (React.createElement("div", { className: "flex justify-center items-center min-h-screen bg-background" },
            React.createElement(Loader2, { className: "w-8 h-8 animate-spin text-accent" }),
            React.createElement("span", { className: "ml-2 text-accent font-semibold" }, "Cargando productos...")));
    }
    if (error) {
        return (React.createElement("div", { className: "text-center text-red-500 mt-8 bg-background min-h-screen pt-8" },
            React.createElement("p", { className: "font-semibold" }, error),
            React.createElement("button", { className: "mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90", onClick: () => window.location.reload() }, "Reintentar")));
    }
    return (React.createElement("div", { className: "bg-background min-h-screen py-16" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("h1", { className: "text-3xl font-bold mb-4 text-primary" }, "Nuestros Productos"),
            React.createElement("div", { className: "mb-8 flex space-x-4" }, ['All', 'Low', 'Medium', 'High'].map((quality) => (React.createElement("button", { key: quality, onClick: () => handleQualityChange(quality), className: `px-4 py-2 rounded-lg text-sm font-semibold ${selectedQuality === quality
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}` }, quality === 'All' ? 'Todas' : quality === 'Low' ? 'Baja Calidad' : quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad')))),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" }, filteredProductos.map((producto) => (React.createElement(Card, { key: producto.id, className: "relative border rounded-lg shadow transition-transform hover:scale-105" },
                React.createElement(CardHeader, { className: "p-4" },
                    React.createElement(CardTitle, { className: "text-lg font-bold text-accent" }, producto.name),
                    React.createElement(CardDescription, { className: "text-sm text-muted-foreground line-clamp-2" }, producto.description)),
                React.createElement(CardContent, { className: "p-4 flex flex-col justify-between" },
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("span", { className: "text-lg font-semibold text-accent" }, formatPrice(producto.price))),
                    React.createElement(Badge, { className: `${qualityColors[producto.quality]} py-1 px-3 rounded-full text-xs` }, producto.quality === 'Low' ? 'Baja Calidad' : producto.quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad')),
                React.createElement("div", { className: "absolute top-4 right-4 bg-white p-2 rounded-full shadow" },
                    React.createElement("span", { className: "text-xs font-semibold text-gray-500" },
                        "#",
                        producto.id)))))))));
}
