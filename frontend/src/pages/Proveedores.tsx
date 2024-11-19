'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Phone, Pencil, Trash2 } from 'lucide-react'
import { getRole } from '@/utils/authUtils'
import { Badge } from "@/components/ui/badge"
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

async function createProveedor(providerData: Omit<Proveedor, 'id'>): Promise<Proveedor> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
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
    throw new Error('Error al crear el proveedor')
  }

  return response.json()
}

async function updateProveedor(id: number, providerData: Omit<Proveedor, 'id'>): Promise<Proveedor> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/providers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify(providerData),
  })

  if (!response.ok) {
    throw new Error('Error al actualizar el proveedor')
  }

  return response.json()
}

async function deleteProveedor(id: number): Promise<void> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/providers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al eliminar el proveedor')
  }
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProvider, setEditingProvider] = useState<Proveedor | null>(null)
  const role = getRole() || ''

  useEffect(() => {
    fetchProveedores()
      .then(setProveedores)
      .catch(() => setError('Error al cargar los proveedores'))
      .finally(() => setLoading(false))
  }, [])

  const handleCreateProviderClick = () => {
    setEditingProvider(null)
    setIsDialogOpen(true)
  }

  const handleEditProviderClick = (provider: Proveedor) => {
    setEditingProvider(provider)
    setIsDialogOpen(true)
  }

  const handleSubmitProvider = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const providerData = {
      name: formData.get('name') as string,
      contactInfo: formData.get('contactInfo') as string,
    }

    try {
      if (editingProvider) {
        const updatedProvider = await updateProveedor(editingProvider.id, providerData)
        setProveedores((prev) => prev.map((p) => (p.id === updatedProvider.id ? updatedProvider : p)))
      } else {
        const newProvider = await createProveedor(providerData)
        setProveedores((prev) => [...prev, newProvider])
      }
      setIsDialogOpen(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al procesar el proveedor')
    }
  }

  const handleDeleteProvider = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      try {
        await deleteProveedor(id)
        setProveedores((prev) => prev.filter((p) => p.id !== id))
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error al eliminar el proveedor')
      }
    }
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

        {role.includes('admin') && (
          <Button onClick={handleCreateProviderClick} className="mb-8">
            Crear Proveedor
          </Button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProvider ? 'Editar Proveedor' : 'Crear Proveedor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitProvider} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Proveedor</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProvider?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactInfo">Información de Contacto</Label>
                <Input
                  id="contactInfo"
                  name="contactInfo"
                  defaultValue={editingProvider?.contactInfo}
                  required
                />
              </div>
              <Button type="submit">
                {editingProvider ? 'Actualizar Proveedor' : 'Crear Proveedor'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proveedores.map((proveedor) => (
            <Card key={proveedor.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="rounded-t-lg flex justify-between items-start">
                <CardTitle className="text-accent">{proveedor.name}</CardTitle>
                <Badge variant="outline" className="text-xs">ID: {proveedor.id}</Badge>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-2 text-accent" />
                  <CardDescription>{proveedor.contactInfo}</CardDescription>
                </div>
                {role.includes('admin') && (
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditProviderClick(proveedor)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProvider(proveedor.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
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