'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Phone, MapPin } from 'lucide-react'
import React from 'react'

interface Cliente {
  name: string
  email: string
  contactInfo: string
  relocationInfo?: string
}

async function fetchClientes(): Promise<Cliente[]> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch('http://localhost:3000/clients', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al obtener clientes')
  }

  return response.json()
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClientes()
      .then(setClientes)
      .catch(() => setError('Error al cargar los clientes'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8 bg-background min-h-screen pt-8">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary">Nuestros Clientes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente, index) => (
            <Card key={index} className="border border-muted shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-primary/5 p-4 rounded-t-lg">
                <CardTitle className="text-primary">{cliente.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  <CardDescription>{cliente.email}</CardDescription>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  <CardDescription>{cliente.contactInfo}</CardDescription>
                </div>
                {cliente.relocationInfo && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    <CardDescription>{cliente.relocationInfo}</CardDescription>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
