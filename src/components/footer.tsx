import React from 'react';
import './estilos/footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <small>© {new Date().getFullYear()} Account Manager</small>
      </div>
    </footer>
  );
}