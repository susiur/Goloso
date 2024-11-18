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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';
function fetchClientes() {
    return __awaiter(this, void 0, void 0, function* () {
        const access_token = localStorage.getItem('token');
        if (!access_token) {
            throw new Error('No se encontró token de acceso');
        }
        const response = yield fetch('http://localhost:3000/clients', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener clientes');
        }
        return response.json();
    });
}
export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchClientes()
            .then(setClientes)
            .catch(() => setError('Error al cargar los clientes'))
            .finally(() => setLoading(false));
    }, []);
    if (loading) {
        return (React.createElement("div", { className: "flex justify-center items-center h-screen bg-background" },
            React.createElement(Loader2, { className: "w-8 h-8 animate-spin text-primary" })));
    }
    if (error) {
        return (React.createElement("div", { className: "text-center text-red-500 mt-8 bg-background min-h-screen pt-8" },
            React.createElement("p", null, error)));
    }
    return (React.createElement("div", { className: "bg-background min-h-screen py-8" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("h1", { className: "text-3xl font-bold mb-8 text-primary" }, "Nuestros Clientes"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, clientes.map((cliente, index) => (React.createElement(Card, { key: index, className: "border border-muted shadow-sm hover:shadow-md transition-shadow duration-200" },
                React.createElement(CardHeader, { className: "bg-primary/5 p-4 rounded-t-lg" },
                    React.createElement(CardTitle, { className: "text-primary" }, cliente.name)),
                React.createElement(CardContent, { className: "p-4 space-y-2" },
                    React.createElement("div", { className: "flex items-center text-muted-foreground" },
                        React.createElement(Mail, { className: "w-5 h-5 mr-2 text-primary" }),
                        React.createElement(CardDescription, null, cliente.email)),
                    React.createElement("div", { className: "flex items-center text-muted-foreground" },
                        React.createElement(Phone, { className: "w-5 h-5 mr-2 text-primary" }),
                        React.createElement(CardDescription, null, cliente.contactInfo)),
                    cliente.relocationInfo && (React.createElement("div", { className: "flex items-center text-muted-foreground" },
                        React.createElement(MapPin, { className: "w-5 h-5 mr-2 text-primary" }),
                        React.createElement(CardDescription, null, cliente.relocationInfo)))))))))));
}
