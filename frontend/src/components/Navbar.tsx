'use client'

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRole, isAuthenticated } from '../utils/authUtils'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const role = getRole()
  const authenticated = isAuthenticated()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="p-4 bg-primary text-primary-foreground">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">El Goloso</Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/productos" className="hover:text-primary-foreground/80">Productos</Link>
          <Link to="/providers" className="hover:text-primary-foreground/80">Proveedores</Link>
          <Link to="/clients" className="hover:text-primary-foreground/80">Clientes</Link>
          {authenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Mi Cuenta</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Panel de Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="secondary">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}