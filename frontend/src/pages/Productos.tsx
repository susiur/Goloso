import { useEffect, useState } from 'react';
import { fetchProductos } from '../services/api';
import React from 'react';

function Productos() {
  interface Producto {
    id: number;
    name: string;
    price: number;
  }

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetchProductos().then(setProductos);
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.name} - ${producto.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
