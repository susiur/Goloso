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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Heart } from 'lucide-react';
import React from 'react';
export default function RegisterForm() {
    var _this = this;
    var _a = useState(''), name = _a[0], setName = _a[1];
    var _b = useState(''), email = _b[0], setEmail = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var _d = useState(''), error = _d[0], setError = _d[1];
    var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var navigate = useNavigate();
    var handleRegister = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var emailRegex, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    setIsLoading(true);
                    setError('');
                    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        setError('Por favor, ingrese un correo electrónico válido.');
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    if (password.length < 8) {
                        setError('La contraseña debe tener al menos 8 caracteres.');
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/auth/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name: name, email: email, password: password }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Error al registrarse');
                    }
                    navigate('/login');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    setError('Error al registrarse. Por favor, intente de nuevo.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "auth-background" },
        React.createElement(Card, { className: "auth-card" },
            React.createElement(CardHeader, { className: "auth-header" },
                React.createElement(Heart, { className: "w-12 h-12 mx-auto text-primary mb-2" }),
                React.createElement(CardTitle, { className: "text-2xl font-bold" }, "\u00DAnete a Esperanza para todos"),
                React.createElement(CardDescription, null, "Crea una nueva cuenta para disfrutar nuestros servicios")),
            React.createElement(CardContent, null,
                React.createElement("form", { onSubmit: handleRegister, className: "auth-form" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: "name" }, "Nombre"),
                        React.createElement(Input, { id: "name", placeholder: "Ingrese su nombre", value: name, onChange: function (e) { return setName(e.target.value); }, className: "auth-input", required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: "email" }, "Correo electr\u00F3nico"),
                        React.createElement(Input, { id: "email", type: "email", placeholder: "Ingrese su correo electr\u00F3nico", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "auth-input", required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: "password" }, "Contrase\u00F1a"),
                        React.createElement(Input, { id: "password", type: "password", placeholder: "Cree una contrase\u00F1a", value: password, onChange: function (e) { return setPassword(e.target.value); }, className: "auth-input", required: true })),
                    error && (React.createElement(Alert, { variant: "destructive" },
                        React.createElement(AlertCircle, { className: "h-4 w-4" }),
                        React.createElement(AlertTitle, null, "Error"),
                        React.createElement(AlertDescription, null, error))),
                    React.createElement(Button, { className: "auth-button", type: "submit", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                        React.createElement(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Cargando...")) : ('Registrarse')))),
            React.createElement(CardFooter, { className: "flex justify-center" },
                React.createElement(Button, { variant: "link", className: "auth-link", onClick: function () { return navigate('/login'); } }, "\u00BFYa tienes una cuenta? Inicia sesi\u00F3n")))));
}
