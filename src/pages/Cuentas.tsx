import React, { useState, useEffect } from 'react';
import AccountCard from '../components/cardcuenta';
import '../components/estilos/cuentas.css';

interface Account {
  id: number;
  title: string;
  status: 'Conectado' | 'Desconectado';
  lastLogin: string;
}

export default function Cuentas() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({ title: '', status: 'Desconectado' as const, lastLogin: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('accounts');
    if (saved) setAccounts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const save = () => {
    if (!form.title.trim()) {
      alert('Nombre de la cuenta es requerido');
      return;
    }
    if (!form.lastLogin.trim()) {
      alert('Fecha de último login es requerida');
      return;
    }

    if (editingId) {
      setAccounts(prev =>
        prev.map(a =>
          a.id === editingId
            ? { ...a, title: form.title, status: form.status, lastLogin: form.lastLogin }
            : a
        )
      );
    } else {
      const id = Math.max(...accounts.map(a => a.id), 0) + 1;
      setAccounts(prev => [...prev, { id, ...form }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ title: '', status: 'Desconectado', lastLogin: '' });
    setEditingId(null);
  };

  const edit = (a: Account) => {
    setForm({ title: a.title, status: a.status, lastLogin: a.lastLogin });
    setEditingId(a.id);
  };

  const remove = (id: number) => {
    if (confirm('¿Eliminar esta cuenta?')) {
      setAccounts(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggle = (id: number) => {
    setAccounts(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: a.status === 'Conectado' ? 'Desconectado' : 'Conectado' }
          : a
      )
    );
  };

  return (
    <div className="page-container cuentas-page">
      <header className="cuentas-header">
        <h1>Gestión de Cuentas</h1>
        <p>Crea, edita y administra tus cuentas</p>
      </header>

      <div className="cuentas-layout">
        {/* Formulario */}
        <section className="cuentas-form-section">
          <h2>{editingId ? 'Editar Cuenta' : 'Agregar Nueva Cuenta'}</h2>

          <div className="form-group">
            <label htmlFor="title">Nombre de la Cuenta *</label>
            <input
              id="title"
              type="text"
              placeholder="Ej: Facebook Principal, Instagram Negocio"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado de Conexión</label>
            <select
              id="status"
              value={form.status}
              onChange={e =>
                setForm({
                  ...form,
                  status: e.target.value as 'Conectado' | 'Desconectado',
                })
              }
            >
              <option value="Desconectado">Desconectado</option>
              <option value="Conectado">Conectado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="lastLogin">Último Login *</label>
            <input
              id="lastLogin"
              type="date"
              value={form.lastLogin}
              onChange={e => setForm({ ...form, lastLogin: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button className="btn primary" onClick={save}>
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
            {editingId && (
              <button className="btn secondary" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </section>

        {/* Lista */}
        <section className="cuentas-list-section">
          <div className="list-header">
            <h2>Mis Cuentas ({accounts.length})</h2>
          </div>

          {accounts.length === 0 ? (
            <p className="empty-hint">No hay cuentas. Crea una usando el formulario de arriba.</p>
          ) : (
            <div className="accounts-grid">
              {accounts.map(a => (
                <div key={a.id} className="account-list-item">
                  <AccountCard
                    title={a.title}
                    status={a.status}
                    lastLogin={a.lastLogin}
                    onAction={() => toggle(a.id)}
                    onEdit={() => edit(a)}
                  />
                  <div className="item-actions">
                    <button className="btn small secondary" onClick={() => edit(a)}>
                      Editar
                    </button>
                    <button className="btn small danger" onClick={() => remove(a.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}