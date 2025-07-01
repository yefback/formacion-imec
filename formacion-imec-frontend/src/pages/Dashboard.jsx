import React from 'react';
import './Dashboard.css';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const cursos = [
      { id: 1, title: 'Discipulado', slug: 'discipulado', description: 'Refuerza tu crecimiento espiritual', imagen: 'URL_IMAGEN_DISCIPULADO.jpg' },
      { id: 2, title: 'SIMEC', slug: 'simec', description: 'Entrenamiento ministerial integral', imagen: 'URL_IMAGEN_SIMEC.jpg' },
      { id: 3, title: 'Curso para parejas', slug: 'curso-para-parejas', description: 'Fortalece tu relación con sabiduría', imagen: 'URL_IMAGEN_PAREJAS.jpg' },
      { id: 4, title: 'Curso para hijos', slug: 'curso-para-hijos', description: 'Herramientas para educar con amor', imagen: 'URL_IMAGEN_HIJOS.jpg' },
      { id: 5, title: 'Ver más cursos', slug: 'ver-mas-cursos', description: 'Explora todo lo que tenemos para ti', imagen: 'URL_IMAGEN_MAS_CURSOS.jpg' }
  ];

  return (
  <div className="layout">
  <Sidebar />
  <div className="main-content">
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