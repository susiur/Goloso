'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
import { getRole } from '@/utils/authUtils';

interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  quality: 'Low' | 'Medium' | 'High';
  providerId: number;
}

interface Proveedor {
  id: number;
  name: string;
  contactInfo: string;  // Esto debería ser el número de WhatsApp del proveedor
}

const qualityColors = {
  Low: 'bg-red-100 text-red-600',
  Medium: 'bg-yellow-100 text-yellow-600',
  High: 'bg-green-100 text-green-600',
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
};

async function fetchProductos(): Promise<Producto[]> {
  const access_token = localStorage.getItem('token');
  if (!access_token) {
    throw new Error('No se encontró token de acceso');
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }

  return response.json();
}

async function fetchProveedores(): Promise<Proveedor[]> {
  const access_token = localStorage.getItem('token');
  if (!access_token) {
    throw new Error('No se encontró token de acceso');
  }

  const response = await fetch(`${API_URL}/providers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener proveedor');
  }

  return response.json();
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const role = getRole() || '';

  useEffect(() => {
    // Cargar productos y proveedores simultáneamente
    Promise.all([fetchProductos(), fetchProveedores()])
      .then(([productosData, proveedoresData]) => {
        setProductos(productosData);
        setProveedores(proveedoresData || []);
      })
      .catch(() => setError('Error al cargar los productos o proveedores'))
      .finally(() => setLoading(false));
  }, []);

  const handleQualityChange = (quality: 'All' | 'Low' | 'Medium' | 'High') => {
    setSelectedQuality(quality);
  };

  const handleCreateProductClick = () => {
    setShowCreateProductForm(true);
  };

  const handleCreateProduct = async (productData: Producto) => {
    const access_token = localStorage.getItem('token');
    if (!access_token) {
      setError('No se encontró token de acceso');
      return;
    }

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      setError('Error al crear el producto');
      return;
    }

    const newProduct = await response.json();
    setProductos((prev) => [...prev, newProduct]);
    setShowCreateProductForm(false);
  };

  const filteredProductos = selectedQuality === 'All'
    ? productos
    : productos.filter(producto => producto.quality === selectedQuality);

  const handleWhatsAppClick = async (producto: Producto) => {
    try {
      const proveedor = proveedores.find(p => p.id === producto.providerId);
      if (!proveedor) {
        setErrorMessage('Proveedor no encontrado');
        return;
      }
      // Crear el enlace a WhatsApp
      const mensaje = `Hola ${proveedor.name}, me interesa mucho tu producto ${producto.name}`;
      const whatsappUrl = `https://wa.me/${proveedor.contactInfo}?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      setErrorMessage('Error al generar el enlace de WhatsApp');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-2 text-accent font-semibold">Cargando productos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8 bg-background min-h-screen pt-8">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-primary">Nuestros Productos</h1>

        {/* Filtro de calidad */}
        <div className="mb-8 flex space-x-4">
          {['All', 'Low', 'Medium', 'High'].map((quality) => (
            <button
              key={quality}
              onClick={() => handleQualityChange(quality as 'All' | 'Low' | 'Medium' | 'High')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedQuality === quality
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {quality === 'All' ? 'Todas' : quality === 'Low' ? 'Baja Calidad' : quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad'}
            </button>
          ))}
        </div>

        {/* Botón para crear producto visible solo para admin */}
        {role.includes('admin') && (
          <button
            onClick={handleCreateProductClick}
            className="mb-8 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
          >
            Crear Producto
          </button>
        )}

        {/* Formulario para crear un producto */}
        {showCreateProductForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newProduct: Producto = {
                id: 0, // Esto será asignado automáticamente en el backend
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                price: Number(formData.get('price')),
                quality: formData.get('quality') as 'Low' | 'Medium' | 'High',
                providerId: 1, // Puedes obtener este valor de alguna parte, si es necesario
              };
              handleCreateProduct(newProduct);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-semibold">Nombre</label>
              <input
                type="text"
                name="name"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold">Descripción</label>
              <input
                type="text"
                name="description"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold">Precio</label>
              <input
                type="number"
                name="price"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold">Id Proveedor</label>
              <input
                type="number"
                name="providerId"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold">Calidad</label>
              <select
                name="quality"
                required
                className="mt-2 px-4 py-2 w-full border rounded-lg"
              >
                <option value="Low">Baja</option>
                <option value="Medium">Media</option>
                <option value="High">Alta</option>
              </select>
            </div>
            <button type="submit" className="mt-4 px-6 py-2 bg-accent text-accent-foreground rounded-lg">
              Crear Producto
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {filteredProductos.map((producto) => {
            const proveedor = proveedores.find(p => p.id === producto.providerId);
            return (
              <Card key={producto.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{producto.name}</CardTitle>
                  <CardDescription>{producto.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">{formatPrice(producto.price)}</p>
                  <Badge className={`${qualityColors[producto.quality]} py-1 px-3 rounded-full text-xs`}>
                  {producto.quality === 'Low' ? 'Baja Calidad' : producto.quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad'}
                </Badge>
                  {proveedor && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleWhatsAppClick(producto)}
                        className="px-4 py-2 rounded-lg hover:bg-accent hover:text-white"
                      >
                        Comprar
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
