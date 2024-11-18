import Navbar from '@/components/Navbar';
import './App.css'
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import Productos from './pages/Productos';
import Proveedores from './pages/Proveedores';
import Clientes from './pages/Clientes';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          }
        />
        <Route 
          path="/proveedores" 
          element={
            <PrivateRoute>
              <Proveedores />
            </PrivateRoute>
          }
        />
        <Route 
          path="/clientes" 
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
