import React, { useState, useEffect } from 'react';
import AccountCard from '../components/cardcuenta';
import '../components/estilos/cuentas.css';

interface Account {
  id: number;
  title: string;
  platform?: string;
  identifier?: string; // e.g., RUT or ID for special entities
  status: 'Conectado' | 'Desconectado';
  lastLogin: string;
}

export default function Cuentas() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({ title: '', platform: 'Facebook', identifier: '', status: 'Desconectado' as const });
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

    const now = new Date();
    const lastLogin = now.toISOString().split('T')[0];

    if (editingId) {
      setAccounts(prev =>
        prev.map(a =>
          a.id === editingId
            ? { ...a, title: form.title, platform: form.platform, identifier: form.identifier, status: form.status }
            : a
        )
      );
    } else {
      const id = Math.max(...accounts.map(a => a.id), 0) + 1;
      const newAccount: Account = { id, title: form.title, platform: form.platform, identifier: form.identifier || undefined, status: form.status, lastLogin };
      setAccounts(prev => [...prev, newAccount]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ title: '', platform: 'Facebook', identifier: '', status: 'Desconectado' });
    setEditingId(null);
  };

  const edit = (a: Account) => {
    setForm({ title: a.title, platform: a.platform || 'Facebook', identifier: a.identifier || '', status: a.status });
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
              placeholder="Ej: Facebook Principal, BancoChile - Empresa"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="platform">Plataforma / Tipo</label>
            <select id="platform" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>Google</option>
              <option>Entidad Chilena</option>
              <option>Otra</option>
            </select>
          </div>

          {form.platform === 'Entidad Chilena' && (
            <div className="form-group">
              <label htmlFor="identifier">RUT / Identificador</label>
              <input id="identifier" type="text" placeholder="12.345.678-9" value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="status">Estado de Conexión</label>
            <select
              id="status"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value as 'Conectado' | 'Desconectado' })}
            >
              <option value="Desconectado">Desconectado</option>
              <option value="Conectado">Conectado</option>
            </select>
          </div>

          {/* Nota: la fecha de último login se gestiona automáticamente al crear la cuenta. */}

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
                    platform={a.platform}
                    identifier={a.identifier}
                    status={a.status}
                    lastLogin={a.lastLogin}
                    actionLabel={a.status === 'Conectado' ? 'Conectar' : 'Conectar'}
                    onAction={() => toggle(a.id)}
                    onEdit={() => edit(a)}
                  />
                  <div className="item-actions">
                    <button className="btn small primary" onClick={() => toggle(a.id)}>
                      {a.status === 'Conectado' ? 'Desconectar' : 'Conectar'}
                    </button>
                    <button className="btn small secondary" onClick={() => edit(a)}>
                      Editar
                    </button>
                    <button className="btn small danger" onClick={() => remove(a.id)}>
                      Borrar
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