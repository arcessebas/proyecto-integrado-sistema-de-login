import React, { useState } from 'react';
import '../components/estilos/login.css';

interface LoginProps {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credenciales simuladas
  const DEMO_USER = 'admin';
  const DEMO_PASSWORD = '1234';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      if (username === DEMO_USER && password === DEMO_PASSWORD) {
        localStorage.setItem('user', username);
        localStorage.setItem('isAuthenticated', 'true');
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-logo">🔐</div>
          <h1>Account Manager</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p className="hint">Demo - Usuario: <strong>admin</strong> | Contraseña: <strong>1234</strong></p>
        </div>
      </div>

      <div className="login-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </div>
  );
}
