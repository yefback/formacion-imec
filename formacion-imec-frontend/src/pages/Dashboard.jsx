import React from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import SectionVideo from '../components/SectionVideo';

const Dashboard = () => {
  const navigate = useNavigate();

  const cursos = [
    { id: 1, title: 'Discipulado', slug: 'discipulado', description: 'Refuerza tu crecimiento espiritual', imagen: 'asset/consolidacion.png' },
    { id: 2, title: 'SIMEC', slug: 'simec', description: 'Entrenamiento ministerial integral', imagen: 'asset/SIMEC.png' },
    { id: 3, title: 'Curso para parejas', slug: 'curso-para-parejas', description: 'Fortalece tu relación con sabiduría', imagen: 'asset/parejas.png' },
    { id: 4, title: 'Curso para hijos', slug: 'curso-para-hijos', description: 'Herramientas para educar con amor', imagen: 'asset/hijos.png' },
    { id: 5, title: 'Ver más cursos', slug: 'ver-mas-cursos', description: 'Explora todo lo que tenemos para ti', imagen: 'asset/cursos.png' }
  ];

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="welcome-section">
          <SectionVideo />
        </div>
        <div className="courses-section">
          {cursos.map((curso) => (
            <CourseCard
              key={curso.id}
              title={curso.title}
              description={curso.description}
              imagen={curso.imagen}
              onClick={() => navigate(`/cursos/${curso.slug}`)}
            />
          ))}
        </div>
      </div>
    </div>

  );
};

export default Dashboard;