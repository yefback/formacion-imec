import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Formación IMEC</h2>
      <nav>
        <ul>
          <li><a href="/dashboard">🏠 Inicio</a></li>
          <li><a href="/mis-cursos">🎓 Mis cursos</a></li>
          <li><a href="/progreso">📈 Mi progreso</a></li>
          <li><a href="/logros">🏅 Mis logros</a></li>
          <li><a href="/notificaciones">🔔 Notificaciones</a></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>¿Qué opinas?</p>
        <button className="feedback-btn">Danos tu opinión</button>
      </div>
    </aside>
  );
};

export default Sidebar;