import { jwtDecode } from 'jwt-decode';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

interface DecodedToken {
  role: string;
  // Agrega otras propiedades del token si es necesario
}

export function getRole(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Intentamos decodificar el token
      const decoded: DecodedToken = jwtDecode(token);
      console.log('Token decodificado:', decoded);
      // Verificamos si el campo `role` existe en el decoded token
      if (decoded && decoded.role) {
        return decoded.role; // Si existe el rol, lo retornamos
      } else {
        console.error('Token decodificado no contiene un rol.');
        return null;
      }
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }
  return null; // Si no hay token en localStorage
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
