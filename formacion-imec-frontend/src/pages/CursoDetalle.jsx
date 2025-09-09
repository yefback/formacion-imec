import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import cursosData from '../data/CursosData';
import '../styles/CursoDetalle.css'; // Importa tu nuevo archivo CSS

export const CursoDetalle = () => {
  const { nombreCurso } = useParams();
  const navigate = useNavigate(); // Inicializa useNavigate para el botón
    
  // Asegúrate de que el slug en cursosData.js coincida con nombreCurso (minúsculas, guiones)
  const curso = cursosData.find(c => c.slug === nombreCurso);

  if (!curso) {
    return <p className="curso-no-encontrado">Curso no encontrado 😥</p>;
  }

  return (
    <>
      <div className="curso-detalle-container">
        {/* Botón "Volver al Dashboard" */}
        <button
          className="btn-volver-dashboard"
          onClick={() => navigate('/dashboard')}
        >
          &larr; Volver al Dashboard
        </button>

        <h1 className="curso-detalle-title">{curso.title}</h1>

        {/* --- CAMBIO CLAVE AQUÍ: Envolver imagen y chat --- */}
        <div className="curso-content-area">
          <img
            src={curso.imagen}
            alt={curso.title}
            className="curso-detalle-image" // Usa la clase CSS aquí
          />
          <div className="curso-chat-panel">
            <h2>Chat en Vivo</h2>
            {/* Aquí iría tu componente de chat */}
            <p>Panel de chat en vivo para este curso.</p>
          </div>
        </div>
        {/* ------------------------------------------------ */}

        <p className="curso-detalle-description">{curso.description}</p>

        {/* Contenedor para el botón "Comenzar ahora" */}
        <div className="curso-actions">
          <button
            onClick={() => console.log('Comenzar curso:', curso.slug)}
            className="btn-comenzar" // Usa la clase CSS aquí
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </>
  );
};

export default CursoDetalle;
