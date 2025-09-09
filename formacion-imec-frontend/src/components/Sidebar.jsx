import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 1, label: 'Inicio', icon: '🏠', path: '/dashboard' },
    { id: 2, label: 'Mis cursos', icon: '🎓', path: '/mis-cursos' },
    { id: 3, label: 'Mi progreso', icon: '📈', path: '/progreso' },
    { id: 4, label: 'Mis logros', icon: '🏅', path: '/logros' },
    { id: 5, label: 'Notificaciones', icon: '🔔', path: '/notificaciones' },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div>
          <img src="asset/imec.png" alt="Logo IMEC" className="sidebar-logo" />
        </div>
        <div className="menu"> 
          <nav>
            <ul>
              {menuItems.map(({ id, label, icon, path }) => (
                <li key={id}>
                  <button onClick={() => window.location.href = path}>
                    <span className="icon">{icon}</span> {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="sidebar-footer">
        <p>¿Qué opinas?</p>
        <button className="feedback-btn">DANOS TU OPINIÓN</button>
      </div>
    </aside>
  );
};

export default Sidebar;
