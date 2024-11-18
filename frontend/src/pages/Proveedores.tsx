'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Phone } from 'lucide-react'
import React from 'react'

interface Proveedor {
  id: number
  name: string
  contactInfo: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function fetchProveedores(): Promise<Proveedor[]> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/providers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al obtener proveedores')
  }

  return response.json()
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProveedores()
      .then(setProveedores)
      .catch(() => setError('Error al cargar los proveedores'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
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
        <h1 className="text-3xl font-bold mb-8 text-accent">Nuestros Proveedores</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proveedores.map((proveedor) => (
            <Card key={proveedor.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="rounded-t-lg">
                <CardTitle className="text-accent">{proveedor.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-2 text-accent" />
                  <CardDescription>{proveedor.contactInfo}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
