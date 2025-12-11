import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

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

      <div className="inicio-top">
        <aside className="overview">
          <div className="overview-card">
            <div className="overview-header">Cuentas registradas</div>
            <div className="overview-value">{totalCuentas}</div>
            <div className="overview-sub">Conectadas: {conectadas} • Desconectadas: {desconectadas}</div>
          </div>

          <div className="stats-grid" aria-label="Estadísticas rápidas">
            {stats.map(s => (
              <div key={s.label} className="stat-card small">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </aside>

        <section className="recent-accounts">
          <h2>Últimas cuentas</h2>
          <div className="recent-list-vertical">
            {recent.length === 0 ? (
              <p className="hint">No hay cuentas creadas. Ve a Cuentas para agregar una.</p>
            ) : (
              recent.map((r, i) => (
                <AccountCard 
                  key={r.id ?? i}
                  title={r.title}
                  status={r.status}
                  lastLogin={r.lastLogin}
                  onSelect={() => setSelectedId(r.id)}
                  className={selectedId === r.id ? 'selected' : ''}
                />
              ))
            )}

            <div className="actions-toolbar">
              <div className="actions-inner">
                <button className="btn primary" onClick={() => {
                  const target = selectedId ?? (recent[0] && recent[0].id);
                  if (!target) return;
                  const next = accounts.map(a => a.id === target ? {...a, status: a.status === 'Conectado' ? 'Desconectado' : 'Conectado'} : a);
                  setAccounts(next); localStorage.setItem('accounts', JSON.stringify(next));
                }} disabled={recent.length === 0}>Conectar / Desconectar</button>

                <button className="btn secondary" onClick={() => navigate('/cuentas')} disabled={recent.length === 0}>Editar</button>

                <button className="btn danger" onClick={() => {
                  const target = selectedId ?? (recent[0] && recent[0].id);
                  if (!target) return;
                  const next = accounts.filter(a => a.id !== target);
                  setSelectedId(null);
                  setAccounts(next); localStorage.setItem('accounts', JSON.stringify(next));
                }} disabled={recent.length === 0}>Borrar</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}