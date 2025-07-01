import React from 'react';
/*import './Topbar.css';*/ // Mantén este import, ya que JSX lo requiere internamente.
// import { useNavigate, useLocation } from 'react-router-dom'; // Puedes eliminarlos si no se usan

const Topbar = () => {
  // Si no hay contenido visible ni lógica activa en el Topbar,
  // simplemente retorna un div vacío.
  return (
    <div className="topbar">
      {/* Si en el futuro quieres añadir un título, logo, etc., lo pones aquí */}
    </div>
  );
};

export default Topbar;

