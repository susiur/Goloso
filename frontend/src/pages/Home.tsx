'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Coffee, Globe, Heart, ShoppingBag, Users } from 'lucide-react';
import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simula la verificación de autenticación, usando el token almacenado en localStorage.
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        {isAuthenticated ? (
          <main className="container mx-auto px-4 py-16">
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-accent">Bienvenido a El Goloso</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            "Descubre nuestra deliciosa selección de productos de calidad"
          </p>
          </section>
          <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <Coffee className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-accent">Productos de calidad</h3>
              <p className="text-muted-foreground">
                Ofrecemos una amplia gama de productos de calidad cuidadosamente seleccionados.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-accent">Proveedores confiables</h3>
              <p className="text-muted-foreground">
                Trabajamos con los mejores proveedores para garantizar la calidad de nuestros productos.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <ShoppingBag className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-accent">Experiencia única</h3>
              <p className="text-muted-foreground">
                Disfruta de una experiencia de compra única con nuestros productos exclusivos.
              </p>
            </div>
          </section>
        </main>
        ) : (
          <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-accent">Bienvenido a Esperanza para Todos</h2>
          <p className="text-xl mb-8 text-muted-foreground">Unidos por la solidaridad y el compromiso de un mundo mejor</p>
          <Button size="lg" onClick={() => navigate('/login')}>
            Conoce nuestros proyectos
            <Globe className="ml-2" />
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <Heart className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-accent">Apoyo Humanitario</h3>
            <p className="text-muted-foreground">Proporcionamos ayuda vital a las comunidades que más lo necesitan en todo el mundo.</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md">
            <Users className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-accent">Empoderamiento Comunitario</h3>
            <p className="text-muted-foreground">Trabajamos junto a las comunidades para fortalecer su capacidad de autosuficiencia.</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md">
            <Globe className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-accent">Impacto Global</h3>
            <p className="text-muted-foreground">Promovemos iniciativas que generan un impacto duradero y positivo a nivel mundial.</p>
          </div>
        </section>
      </main>

      <footer className="bg-card mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 Esperanza para Todos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  
        )}
      </main>
    </div>
  );
}
