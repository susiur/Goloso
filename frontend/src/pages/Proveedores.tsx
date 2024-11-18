'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Phone } from 'lucide-react'
import React from 'react'
import { getRole } from '@/utils/authUtils'

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
  const [showCreateProviderForm, setShowCreateProviderForm] = useState(false) // Estado para mostrar el formulario
  const role = getRole() || ''
  useEffect(() => {
    fetchProveedores()
      .then(setProveedores)
      .catch(() => setError('Error al cargar los proveedores'))
      .finally(() => setLoading(false))
  }, [])

  const handleCreateProviderClick = () => {
    setShowCreateProviderForm(true) // Muestra el formulario para crear un proveedor
  }

  const handleCreateProvider = async (providerData: Proveedor) => {
    const access_token = localStorage.getItem('token')
    if (!access_token) {
      setError('No se encontró token de acceso')
      return
    }

    const response = await fetch(`${API_URL}/providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(providerData),
    })

    if (!response.ok) {
      setError('Error al crear el proveedor')
      return
    }

    // Refrescar la lista de proveedores después de agregar el nuevo proveedor
    const newProvider = await response.json()
    setProveedores((prev) => [...prev, newProvider])
    setShowCreateProviderForm(false) // Ocultar el formulario después de agregar el proveedor
  }

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

        {/* Botón para crear proveedor visible solo para admin */}
        {role.includes('admin') && (
          <button
            onClick={handleCreateProviderClick}
            className="mb-8 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
          >
            Crear Proveedor
          </button>
        )}

        {/* Formulario para crear un proveedor */}
        {showCreateProviderForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const newProvider: Proveedor = {
                id: 0, // Este ID se asignará automáticamente desde la base de datos
                name: formData.get('name') as string,
                contactInfo: formData.get('contactInfo') as string,
              }
              handleCreateProvider(newProvider)
            }}
            className="space-y-4 mb-8"
          >
            <div>
              <label className="block font-semibold">Nombre del Proveedor</label>
              <input
                type="text"
                name="name"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold">Información de Contacto</label>
              <input
                type="text"
                name="contactInfo"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="px-4 py-2 bg-accent text-accent-foreground rounded-lg">
                Crear Proveedor
              </button>
            </div>
          </form>
        )}

        {/* Mostrar proveedores */}
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
