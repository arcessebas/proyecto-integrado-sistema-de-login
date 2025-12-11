import './components/estilos/globales.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import Inicio from './pages/Inicio';
import Cuentas from './pages/Cuentas';
import Ajustes from './pages/Ajustes';
import Login from './pages/Login';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    if (auth === 'true' && user) {
      setIsAuthenticated(true);
      setUsername(user);
    }
  }, []);

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-wrapper">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cuentas" element={<Cuentas />} />
          <Route path="/ajustes" element={<Ajustes username={username} onLogout={handleLogout} />} />
        </Routes>
      </main>
    </div>
  );
}