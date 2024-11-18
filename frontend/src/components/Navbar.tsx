'use client'

import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
import { Coffee, Brain, Users, UserCircle, ChevronDown, LogOut, User, Truck, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = getRole() || '' // Recuperamos el rol del usuario y proporcionamos un valor predeterminado si es null
  console.log(role)
  const authenticated = isAuthenticated() // Verificamos si el usuario está autenticado
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Filtramos los elementos del menú según el rol
  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Productos', path: '/productos', icon: Brain },
    { name: 'Proveedores', path: '/proveedores', icon: Truck },
    // Solo mostramos "Clientes" si el usuario tiene el rol "admin"
    ...(role.includes('admin') ? [{ name: 'Clientes', path: '/clientes', icon: Users }] : [])
  ]
  

  // Filtramos los elementos solo si el usuario está autenticado
  const filteredNavItems = authenticated
    ? navItems
    : navItems.filter(item => item.name === 'Inicio')  // Solo mostramos "Inicio" si no está autenticado

  return (
    <nav className="bg-primary text-primary-foreground border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Coffee className="h-8 w-8 text-primary-foreground" />
            <span className="text-2xl font-bold text-primary-foreground">
              {authenticated ? 'El Goloso' : 'Esperanza para todos'}
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${location.pathname === item.path
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {authenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="flex items-center space-x-1 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                    <UserCircle className="w-5 h-5" />
                    <span>Mi Cuenta</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-primary text-primary-foreground">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary-foreground/20" />
                  {role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center hover:bg-primary-foreground/10">
                        <Brain className="w-4 h-4 mr-2" />
                        Panel de Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center hover:bg-primary-foreground/10">
                      <User className="w-4 h-4 mr-2" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-300 hover:bg-primary-foreground/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/login">Iniciar sesión</Link>
                </Button>
                <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link to="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="text-primary-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {filteredNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? 'bg-primary-foreground text-primary'
                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}
