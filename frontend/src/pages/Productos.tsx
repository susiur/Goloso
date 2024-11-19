import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getRole } from '@/utils/authUtils';
import React from 'react';

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
  contactInfo: string;
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

async function deleteProducto(id: number): Promise<void> {
  const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (!confirmDelete) return;
  const access_token = localStorage.getItem('token');
  if (!access_token) {
    throw new Error('No se encontró token de acceso');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar producto');
  }
}

async function updateProducto(id: number, productData: Producto): Promise<Producto> {
  const access_token = localStorage.getItem('token');
  if (!access_token) {
    throw new Error('No se encontró token de acceso');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar producto');
  }

  return response.json();
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const role = getRole() || '';

  useEffect(() => {
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
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProductClick = (producto: Producto) => {
    setEditingProduct(producto);
    setIsDialogOpen(true);
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
    setIsDialogOpen(false);
  };

  const handleUpdateProduct = async (productData: Producto) => {
    if (!editingProduct) return;
    try {
      const updatedProduct = await updateProducto(editingProduct.id, productData);
      setProductos((prev) =>
        prev.map((producto) => (producto.id === updatedProduct.id ? updatedProduct : producto))
      );
      setEditingProduct(null);
      setIsDialogOpen(false);
    } catch (error) {
      setError('Error al actualizar producto');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProducto(id);
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
    } catch (error) {
      setError('Error al eliminar producto');
    }
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

        <div className="mb-8 flex space-x-4">
          {['All', 'Low', 'Medium', 'High'].map((quality) => (
            <Button
              key={quality}
              onClick={() => handleQualityChange(quality as 'All' | 'Low' | 'Medium' | 'High')}
              variant={selectedQuality === quality ? "default" : "outline"}
            >
              {quality === 'All' ? 'Todas' : quality === 'Low' ? 'Baja Calidad' : quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad'}
            </Button>
          ))}
        </div>

        {role.includes('admin') && (
          <Button onClick={handleCreateProductClick} className="mb-8">
            Crear Producto
          </Button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Editar Producto' : 'Crear Producto'}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const newProduct: Producto = {
                  id: editingProduct ? editingProduct.id : 0,
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  price: Number(formData.get('price')),
                  quality: formData.get('quality') as 'Low' | 'Medium' | 'High',
                  providerId: Number(formData.get('providerId'))
                };
                if (editingProduct) {
                  handleUpdateProduct(newProduct);
                } else {
                  handleCreateProduct(newProduct);
                }
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProduct?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingProduct?.description}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editingProduct?.price}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quality">Calidad</Label>
                <Select name="quality" defaultValue={editingProduct?.quality || 'Medium'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la calidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Baja</SelectItem>
                    <SelectItem value="Medium">Media</SelectItem>
                    <SelectItem value="High">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="providerId">ID del Proveedor</Label>
                <Input
                  id="providerId"
                  name="providerId"
                  type="number"
                  defaultValue={editingProduct?.providerId}
                  required
                />
              </div>
              <Button type="submit">
                {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

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
                  <Badge variant="secondary" className={qualityColors[producto.quality]}>
                    {producto.quality === 'Low' ? 'Baja Calidad' : producto.quality === 'Medium' ? 'Calidad Media' : 'Alta Calidad'}
                  </Badge>

                  {role.includes('admin') && (
                    <div className="flex justify-between mt-4">
                      <Button
                        onClick={() => handleEditProductClick(producto)}
                        variant="outline"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDeleteProduct(producto.id)}
                        variant="destructive"
                      >
                        Eliminar
                      </Button>
                    </div>
                  )}

                  {proveedor && (
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={() => handleWhatsAppClick(producto)}
                        variant="outline"
                      >
                        Comprar
                      </Button>
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