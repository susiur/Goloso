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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
var qualityColors = {
    Low: 'bg-red-100 text-red-600',
    Medium: 'bg-yellow-100 text-yellow-600',
    High: 'bg-green-100 text-green-600',
};
var formatPrice = function (price) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
};
function fetchProductos() {
    return __awaiter(this, void 0, void 0, function () {
        var access_token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    access_token = localStorage.getItem('token');
                    if (!access_token) {
                        throw new Error('No se encontró token de acceso');
                    }
                    return [4 /*yield*/, fetch('http://localhost:3000/products', {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(access_token),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Error al obtener productos');
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
export default function Productos() {
    var _a = useState([]), productos = _a[0], setProductos = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var _d = useState('All'), selectedQuality = _d[0], setSelectedQuality = _d[1];
    useEffect(function () {
        fetchProductos()
            .then(setProductos)
            .catch(function () { return setError('Error al cargar los productos'); })
            .finally(function () { return setLoading(false); });
    }, []);
    var handleQualityChange = function (quality) {
        setSelectedQuality(quality);
    };
    // Filtrar productos según la calidad seleccionada
    var filteredProductos = selectedQuality === 'All'
        ? productos
        : productos.filter(function (producto) { return producto.quality === selectedQuality; });
    if (loading) {
        return (React.createElement("div", { className: "flex justify-center items-center min-h-screen bg-background" },
            React.createElement(Loader2, { className: "w-8 h-8 animate-spin text-accent" }),
            React.createElement("span", { className: "ml-2 text-accent font-semibold" }, "Cargando productos...")));
    }
    if (error) {
        return (React.createElement("div", { className: "text-center text-red-500 mt-8 bg-background min-h-screen pt-8" },
            React.createElement("p", { className: "font-semibold" }, error),
            React.createElement("button", { className: "mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90", onClick: function () { return window.location.reload(); } }, "Reintentar")));
    }
    return (React.createElement("div", { className: "bg-background min-h-screen py-16" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("h1", { className: "text-3xl font-bold mb-4 text-primary" }, "Nuestros Productos"),
            React.createElement("div", { className: "mb-8 flex space-x-4" }, ['All', 'Low', 'Medium', 'High'].map(function (quality) { return (React.createElement("button", { key: quality, onClick: function () { return handleQualityChange(quality); }, className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(selectedQuality === quality
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300') }, quality === 'All' ? 'Todas' : quality === 'Low' ? 'Baja Calidad' : quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad')); })),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" }, filteredProductos.map(function (producto) { return (React.createElement(Card, { key: producto.id, className: "relative border rounded-lg shadow transition-transform hover:scale-105" },
                React.createElement(CardHeader, { className: "p-4" },
                    React.createElement(CardTitle, { className: "text-lg font-bold text-accent" }, producto.name),
                    React.createElement(CardDescription, { className: "text-sm text-muted-foreground line-clamp-2" }, producto.description)),
                React.createElement(CardContent, { className: "p-4 flex flex-col justify-between" },
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("span", { className: "text-lg font-semibold text-accent" }, formatPrice(producto.price))),
                    React.createElement(Badge, { className: "".concat(qualityColors[producto.quality], " py-1 px-3 rounded-full text-xs") }, producto.quality === 'Low' ? 'Baja Calidad' : producto.quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad')),
                React.createElement("div", { className: "absolute top-4 right-4 bg-white p-2 rounded-full shadow" },
                    React.createElement("span", { className: "text-xs font-semibold text-gray-500" },
                        "#",
                        producto.id)))); })))));
}
