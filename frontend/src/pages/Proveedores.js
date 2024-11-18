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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Phone } from 'lucide-react';
import React from 'react';
function fetchProveedores() {
    return __awaiter(this, void 0, void 0, function () {
        var access_token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    access_token = localStorage.getItem('token');
                    if (!access_token) {
                        throw new Error('No se encontró token de acceso');
                    }
                    return [4 /*yield*/, fetch('http://localhost:3000/providers', {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(access_token),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Error al obtener proveedores');
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
export default function Proveedores() {
    var _a = useState([]), proveedores = _a[0], setProveedores = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    useEffect(function () {
        fetchProveedores()
            .then(setProveedores)
            .catch(function () { return setError('Error al cargar los proveedores'); })
            .finally(function () { return setLoading(false); });
    }, []);
    if (loading) {
        return (React.createElement("div", { className: "flex justify-center items-center h-screen bg-background" },
            React.createElement(Loader2, { className: "w-8 h-8 animate-spin text-accent" })));
    }
    if (error) {
        return (React.createElement("div", { className: "text-center text-red-500 mt-8 bg-background min-h-screen pt-8" },
            React.createElement("p", null, error)));
    }
    return (React.createElement("div", { className: "bg-background min-h-screen py-8" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("h1", { className: "text-3xl font-bold mb-8 text-accent" }, "Nuestros Proveedores"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, proveedores.map(function (proveedor) { return (React.createElement(Card, { key: proveedor.id, className: "overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200" },
                React.createElement(CardHeader, { className: "rounded-t-lg" },
                    React.createElement(CardTitle, { className: "text-accent" }, proveedor.name)),
                React.createElement(CardContent, { className: "p-4" },
                    React.createElement("div", { className: "flex items-center text-muted-foreground" },
                        React.createElement(Phone, { className: "w-5 h-5 mr-2 text-accent" }),
                        React.createElement(CardDescription, null, proveedor.contactInfo))))); })))));
}
