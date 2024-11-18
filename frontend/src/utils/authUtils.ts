import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  // Agrega otras propiedades del token si es necesario
}

export function getRole(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
