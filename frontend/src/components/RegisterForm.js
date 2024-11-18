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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, ingrese un correo electrónico válido.');
            setIsLoading(false);
            return;
        }
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            setIsLoading(false);
            return;
        }
        try {
            const response = yield fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) {
                throw new Error('Error al registrarse');
            }
            navigate('/login');
        }
        catch (error) {
            setError('Error al registrarse. Por favor, intente de nuevo.');
        }
        finally {
            setIsLoading(false);
        }
    });
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
                        React.createElement(Input, { id: "name", placeholder: "Ingrese su nombre", value: name, onChange: (e) => setName(e.target.value), className: "auth-input", required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: "email" }, "Correo electr\u00F3nico"),
                        React.createElement(Input, { id: "email", type: "email", placeholder: "Ingrese su correo electr\u00F3nico", value: email, onChange: (e) => setEmail(e.target.value), className: "auth-input", required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: "password" }, "Contrase\u00F1a"),
                        React.createElement(Input, { id: "password", type: "password", placeholder: "Cree una contrase\u00F1a", value: password, onChange: (e) => setPassword(e.target.value), className: "auth-input", required: true })),
                    error && (React.createElement(Alert, { variant: "destructive" },
                        React.createElement(AlertCircle, { className: "h-4 w-4" }),
                        React.createElement(AlertTitle, null, "Error"),
                        React.createElement(AlertDescription, null, error))),
                    React.createElement(Button, { className: "auth-button", type: "submit", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                        React.createElement(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Cargando...")) : ('Registrarse')))),
            React.createElement(CardFooter, { className: "flex justify-center" },
                React.createElement(Button, { variant: "link", className: "auth-link", onClick: () => navigate('/login') }, "\u00BFYa tienes una cuenta? Inicia sesi\u00F3n")))));
}
