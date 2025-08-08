// components/Navbar.tsx
import { Link } from 'react-router-dom';
import '../style/NavbarPag.css';
import { useAdmin } from '../context/AdminContext'; // Ajusta la ruta si es necesario

export default function NavbarPag() {
  const { tipoUsuario } = useAdmin(); // 👈 Accede al tipo de usuario

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🏠 Inicio</Link>
      </div>

      <div className="navbar-right">
        {tipoUsuario === 'admi' && (
          <>
            <Link to="/cursos">Cursos</Link>
            <Link to="/asistencia">Asistencia</Link>
            <Link to="/crear-usuario">Crear Usuario</Link>
            <Link to="/matricula-alumno">Matricular Alumno</Link>
          </>
        )}

        {(tipoUsuario === 'admi' || tipoUsuario === 'alumno') && (
          <Link to="/finanzas">Finanzas</Link>
        )}

        {tipoUsuario === 'alumno' && (
          <Link to="/perfilA">Perfil</Link>
        )}
      </div>
    </nav>
  );
}
