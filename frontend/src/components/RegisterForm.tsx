'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2, Heart } from 'lucide-react'
import React from 'react'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),
      })

      if (!response.ok) {
        throw new Error('Error al registrarse')
      }

      navigate('/login')
    } catch (error) {
      setError('Error al registrarse. Por favor, intente de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-background">
      <Card className="auth-card">
        <CardHeader className="auth-header">
          <Heart className="w-12 h-12 mx-auto text-primary mb-2" />
          <CardTitle className="text-2xl font-bold">Únete a Esperanza para todos</CardTitle>
          <CardDescription>Crea una nueva cuenta para disfrutar nuestros servicios</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="auth-form">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Cree una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button className="auth-button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="auth-link" onClick={() => navigate('/login')}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}