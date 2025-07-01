import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CursoDetalle from './pages/CursoDetalle';
import Topbar from './components/Topbar';

function AppContent() {
  const location = useLocation();
  const isCursoDetalle = location.pathname.startsWith('/cursos/');

  return (
    <>
      {isCursoDetalle && <Topbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cursos/:nombreCurso" element={<CursoDetalle />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;