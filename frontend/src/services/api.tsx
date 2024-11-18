import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL de tu backend

export const fetchProductos = async () => {
  const response = await axios.get(`${API_URL}/productos`);
  return response.data;
};

// Puedes añadir más funciones para otras llamadas a la API
