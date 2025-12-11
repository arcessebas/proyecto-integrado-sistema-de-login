import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import './estilos/navbar.css';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm('¿Cerrar sesión?')) {
      localStorage.removeItem('accounts');
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <button className="menu-toggle" onClick={onMenuClick} aria-label="Menú">
        <Menu size={20} />
      </button>

      <div className="navbar-logo" aria-hidden="true">🔐</div>

      <button className="logout-btn" onClick={handleLogout} aria-label="Cerrar sesión">
        <LogOut size={18} />
      </button>
    </nav>
  );
}