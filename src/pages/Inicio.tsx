import React, { useState, useEffect } from 'react';
import AccountCard from '../components/cardcuenta';
import '../components/estilos/globales.css';


interface Account {
  id: number;
  title: string;
  status: 'Conectado' | 'Desconectado';
  lastLogin: string;
}

export default function Inicio() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('accounts');
    if (saved) {
      setAccounts(JSON.parse(saved));
    }
  }, []);

  // Calcular estadísticas
  const totalCuentas = accounts.length;
  const conectadas = accounts.filter(a => a.status === 'Conectado').length;
  const desconectadas = accounts.filter(a => a.status === 'Desconectado').length;

  const stats = [
    { label: 'Cuentas', value: totalCuentas },
    { label: 'Conectadas', value: conectadas },
    { label: 'Desconectadas', value: desconectadas },
  ];

  // Mostrar últimas 3 cuentas
  const recent = accounts.slice(-3).reverse();

  return (
    <div className="page-container inicio-page">
      <header className="hero">
        <div>
          <h1 className="hero-title">Bienvenido</h1>
          <p className="hero-subtitle">Gestiona tus cuentas desde aquí.</p>
        </div>
      </header>

      <section className="stats-grid" aria-label="Estadísticas rápidas">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="recent-section">
        <h2>Cuentas Recientes</h2>
        <div className="recent-list">
          {recent.length === 0 ? (
            <p className="hint">No hay cuentas creadas. Ve a la sección de Cuentas para agregar una.</p>
          ) : (
            recent.map((r, i) => (
              <AccountCard 
                key={i} 
                title={r.title} 
                status={r.status} 
                lastLogin={r.lastLogin} 
                actionLabel={r.status === 'Conectado' ? 'Ver' : 'Conectar'}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}