import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Settings, X } from 'lucide-react';
import './estilos/sidebar.css';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const items = [
    { id: 'inicio', label: 'Inicio', icon: Home, to: '/' },
    { id: 'cuentas', label: 'Cuentas', icon: User, to: '/cuentas' },
    { id: 'ajustes', label: 'Ajustes', icon: Settings, to: '/ajustes' },
  ];

  useEffect(() => {
    // añade clase al body para que el contenido se empuje con CSS
    document.body.classList.toggle('sidebar-open', Boolean(open));
  }, [open]);

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : 'closed'}`} aria-hidden={!open}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={onClose} aria-label="Cerrar"><X size={18} /></button>
        </div>

        <nav className="sidebar-menu" role="navigation">
          {items.map(it => {
            const Icon = it.icon;
            return (
              <Link key={it.id} to={it.to} className="sidebar-item" onClick={onClose}>
                <Icon size={18} />
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}