import { useAdmin } from "../context/AdminContext"; // Ajusta la ruta si es necesario

export default function Dashboards() {
  const { nombreUsuario, tipoUsuario } = useAdmin();

  const renderBienvenida = () => {
    if (tipoUsuario === "admi") {
      return "Bienvenido, Administrador";
    }

    // Si no es administrador, mostrar nombre + tipo de usuario
    return `Bienvenido${nombreUsuario ? `, ${nombreUsuario}` : ""}${tipoUsuario ? ` (${tipoUsuario})` : ""}`;
  };

  return (
    <div className="container">
      <h2>{renderBienvenida()}</h2>

      <div className="card">
        <h3>Resumen Rápido</h3>
        <ul>
          <li>Alumnos matriculados: 120</li>
          <li>Cursos activos: 5</li>
          <li>Pagos pendientes: 18</li>
        </ul>
      </div>
    </div>
  );
}
