import React from 'react';
import './estilos/cardcuenta.css';

interface AccountCardProps {
  title?: string;
  name?: string;
  nombre?: string;

  status?: 'Conectado' | 'Desconectado' | string;
  conectado?: boolean;
  connected?: boolean;

  lastLogin?: string;
  platform?: string;
  identifier?: string;

  imagen?: string;
  image?: string;

  actionLabel?: string;
  onEditar?: () => void;
  onEdit?: () => void;
  onAction?: () => void;
  onSelect?: () => void;
}

export default function AccountCard(props: AccountCardProps) {
  const displayName = props.title ?? props.name ?? props.nombre ?? 'Cuenta';
  const isConnected =
    props.status
      ? String(props.status).toLowerCase() === 'conectado'
      : props.conectado ?? props.connected ?? false;
  const statusLabel = props.status ?? (isConnected ? 'Conectado' : 'Desconectado');
  const imageSrc = props.imagen ?? props.image;
  const actionLabel = props.actionLabel ?? (isConnected ? 'Ver' : 'Conectar');

  const handleEdit = () => {
    if (props.onEditar) return props.onEditar();
    if (props.onEdit) return props.onEdit();
  };
  const handleAction = () => {
    if (props.onAction) return props.onAction();
    return handleEdit();
  };

  return (
    <div className={`account-card${props.onSelect ? ' selectable' : ''}`} onClick={props.onSelect} role={props.onSelect ? 'button' : undefined} tabIndex={props.onSelect ? 0 : undefined}>
      {imageSrc && (
        <div className="account-image">
          <img src={imageSrc} alt={displayName} />
        </div>
      )}

      <div className="account-info">
        <h3>{displayName}</h3>
        {props.platform && <div className="platform">{props.platform}{props.identifier ? ` · ${props.identifier}` : ''}</div>}
        <p className={`status-badge ${isConnected ? 'connected' : 'disconnected'}`}>
          {statusLabel}
        </p>
        {props.lastLogin && (
          <div className="meta">
            <span className="meta-item">Último login: {props.lastLogin}</span>
          </div>
        )}
      </div>

      {/* Actions moved to the parent (Inicio/Cuentas) */}
    </div>
  );
}