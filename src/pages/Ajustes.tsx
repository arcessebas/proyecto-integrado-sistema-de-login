import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/estilos/ajustes.css';

interface AjustesProps {
  username?: string;
  onLogout?: () => void;
}

export default function Ajustes({ username = 'usuario', onLogout }: AjustesProps) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [accountsCount, setAccountsCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('accounts');
    if (saved) {
      setAccountsCount(JSON.parse(saved).length);
    }
  }, []);

  const handleClearData = () => {
    if (confirm('¿Estás seguro de que deseas eliminar todas las cuentas y datos? Esta acción es irreversible.')) {
      localStorage.removeItem('accounts');
      setAccountsCount(0);
      alert('Todos los datos han sido eliminados');
    }
  };

  const handleLogout = () => {
    if (confirm('¿Cerrar sesión?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('accounts');
      if (onLogout) onLogout();
      navigate('/');
    }
  };

  return (
    <div className="page-container ajustes-page">
      <header className="ajustes-header">
        <h1>⚙️ Configuración</h1>
        <p>Administra los ajustes de tu aplicación</p>
      </header>

      <div className="ajustes-content">
        {/* Sección: Perfil */}
        <section className="ajustes-section">
          <div className="section-header">
            <h2>👤 Perfil</h2>
          </div>
          <div className="section-body">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-placeholder">{username?.charAt(0).toUpperCase() || 'A'}</div>
              </div>
              <div className="profile-info">
                <p className="profile-name">Usuario: <strong>{username}</strong></p>
                <p className="profile-meta">Sesión activa</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Sesión */}
        <section className="ajustes-section">
          <div className="section-header">
            <h2>🔐 Sesión</h2>
          </div>
          <div className="section-body">
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Cerrar Sesión</p>
                <p className="setting-description">Termina tu sesión actual</p>
              </div>
              <button className="btn danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </section>

        {/* Sección: Preferencias */}
        <section className="ajustes-section">
          <div className="section-header">
            <h2>🎨 Preferencias</h2>
          </div>
          <div className="section-body">
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Tema</p>
                <p className="setting-description">Cambia el tema de la aplicación</p>
              </div>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="setting-select"
              >
                <option value="dark">Oscuro</option>
                <option value="light">Claro</option>
                <option value="auto">Automático</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Notificaciones</p>
                <p className="setting-description">Recibe alertas de cambios en cuentas</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={e => setNotifications(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Conexión Automática</p>
                <p className="setting-description">Conectar cuentas automáticamente</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoConnect}
                  onChange={e => setAutoConnect(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Sección: Datos */}
        <section className="ajustes-section">
          <div className="section-header">
            <h2>📊 Datos</h2>
          </div>
          <div className="section-body">
            <div className="data-stats">
              <div className="stat">
                <span className="stat-label">Cuentas Guardadas</span>
                <span className="stat-value">{accountsCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Espacio Usado</span>
                <span className="stat-value">Local Storage</span>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Limpiar Datos</p>
                <p className="setting-description">Elimina todas las cuentas y datos guardados</p>
              </div>
              <button className="btn danger-outline" onClick={handleClearData}>
                Limpiar
              </button>
            </div>
          </div>
        </section>

        {/* Sección: Acerca de */}
        <section className="ajustes-section">
          <div className="section-header">
            <h2>ℹ️ Acerca de</h2>
          </div>
          <div className="section-body">
            <div className="about-content">
              <p><strong>Account Manager</strong></p>
              <p>v1.0.0</p>
              <p className="about-description">
                Aplicación para gestionar y controlar múltiples cuentas de redes sociales desde un único panel de control.
              </p>
              <p className="about-tech">
                Construido con React + TypeScript + Vite
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}