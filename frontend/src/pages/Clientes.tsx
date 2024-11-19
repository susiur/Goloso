'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Mail, Phone, MapPin, Pencil, Trash2 } from 'lucide-react'
import { getRole } from '@/utils/authUtils'
import React from 'react'

interface Cliente {
  id: number
  name: string
  email: string
  contactInfo: string
  relocationInfo?: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function fetchClientes(): Promise<Cliente[]> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/clients`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  })

  if (!response.ok) {
    throw new Error('Error al obtener clientes')
  }

  return response.json()
}

async function createCliente(clientData: Omit<Cliente, 'id'>): Promise<Cliente> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify(clientData),
  })

  if (!response.ok) {
    throw new Error('Error al crear el cliente')
  }

  return response.json()
}

async function updateCliente(id: number, clientData: Omit<Cliente, 'id'>): Promise<Cliente> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify(clientData),
  })

  if (!response.ok) {
    throw new Error('Error al actualizar el cliente')
  }

  return response.json()
}

async function deleteCliente(id: number): Promise<void> {
  const access_token = localStorage.getItem('token')
  if (!access_token) {
    throw new Error('No se encontró token de acceso')
  }

  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al eliminar el cliente')
  }
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Cliente | null>(null)
  const role = getRole() || ''

  useEffect(() => {
    fetchClientes()
      .then(setClientes)
      .catch(() => setError('Error al cargar los clientes'))
      .finally(() => setLoading(false))
  }, [])

  const handleCreateClientClick = () => {
    setEditingClient(null)
    setIsDialogOpen(true)
  }

  const handleEditClientClick = (client: Cliente) => {
    setEditingClient(client)
    setIsDialogOpen(true)
  }

  const handleSubmitClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      contactInfo: formData.get('contactInfo') as string,
      relocationInfo: formData.get('relocationInfo') as string,
    }

    try {
      if (editingClient) {
        const updatedClient = await updateCliente(editingClient.id, clientData)
        setClientes((prev) => prev.map((c) => (c.id === updatedClient.id ? updatedClient : c)))
      } else {
        const newClient = await createCliente(clientData)
        setClientes((prev) => [...prev, newClient])
      }
      setIsDialogOpen(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al procesar el cliente')
    }
  }

  const handleDeleteClient = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        await deleteCliente(id)
        setClientes((prev) => prev.filter((c) => c.id !== id))
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error al eliminar el cliente')
      }
    }
  }

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

        {role.includes('admin') && (
          <Button onClick={handleCreateClientClick} className="mb-8">
            Crear Cliente
          </Button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClient ? 'Editar Cliente' : 'Crear Cliente'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitClient} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingClient?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={editingClient?.email}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactInfo">Información de Contacto</Label>
                <Input
                  id="contactInfo"
                  name="contactInfo"
                  defaultValue={editingClient?.contactInfo}
                  required
                />
              </div>
              <div>
                <Label htmlFor="relocationInfo">Información de Reubicación</Label>
                <Input
                  id="relocationInfo"
                  name="relocationInfo"
                  defaultValue={editingClient?.relocationInfo}
                />
              </div>
              <Button type="submit">
                {editingClient ? 'Actualizar Cliente' : 'Crear Cliente'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <Card key={cliente.id} className="border border-muted shadow-sm hover:shadow-md transition-shadow duration-200">
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
                {role.includes('admin') && (
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-transparent" onClick={() => handleEditClientClick(cliente)}>
                      <Pencil className="w-4 h-4 text-accent" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-transparent" onClick={() => handleDeleteClient(cliente.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
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