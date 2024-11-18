'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';

interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  quality: 'Low' | 'Medium' | 'High';
  providerId: number;
}

const qualityColors = {
  Low: 'bg-red-100 text-red-600',
  Medium: 'bg-yellow-100 text-yellow-600',
  High: 'bg-green-100 text-green-600',
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
};

async function fetchProductos(): Promise<Producto[]> {
  const access_token = localStorage.getItem('token');
  if (!access_token) {
    throw new Error('No se encontró token de acceso');
  }

  const response = await fetch('http://localhost:3000/products', {
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

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');

  useEffect(() => {
    fetchProductos()
      .then(setProductos)
      .catch(() => setError('Error al cargar los productos'))
      .finally(() => setLoading(false));
  }, []);

  const handleQualityChange = (quality: 'All' | 'Low' | 'Medium' | 'High') => {
    setSelectedQuality(quality);
  };

  // Filtrar productos según la calidad seleccionada
  const filteredProductos = selectedQuality === 'All'
    ? productos
    : productos.filter(producto => producto.quality === selectedQuality);

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
        <button
          className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProductos.map((producto) => (
            <Card key={producto.id} className="relative border rounded-lg shadow transition-transform hover:scale-105">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-bold text-accent">{producto.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                  {producto.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex flex-col justify-between">
                <div className="mb-4">
                  <span className="text-lg font-semibold text-accent">{formatPrice(producto.price)}</span>
                </div>
                <Badge className={`${qualityColors[producto.quality]} py-1 px-3 rounded-full text-xs`}>
                  {producto.quality === 'Low' ? 'Baja Calidad' : producto.quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad'}
                </Badge>
              </CardContent>
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                <span className="text-xs font-semibold text-gray-500">#{producto.id}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}