import { useEffect, useState } from 'react';
import '../style/Asistencia.css';
import Navbar from '../components/Navbar';
import NavbarPag from '../components/NavbarPag';

export default function Asistencia() {
  const [cursos, setCursos] = useState([]); // Cursos reales del backend
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [alumnos, setAlumnos] = useState([]);

  const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Cargar cursos desde el backend
  useEffect(() => {
    fetch('http://localhost:3001/cursos')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCursos(data.cursos);
        } else {
          console.error('Error al obtener cursos:', data.error);
        }
      })
      .catch((err) => console.error('Error al conectar con el servidor:', err));
  }, []);

  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);

    // Por ahora: alumnos simulados (más adelante puedes conectarlos al backend)
    setAlumnos([
      { id: 1, nombre: 'Alumno A', asistencia: '' },
      { id: 2, nombre: 'Alumno B', asistencia: '' },
    ]);
  };

  const actualizarAsistencia = (id, estado) => {
    const actualizados = alumnos.map((alumno) =>
      alumno.id === id ? { ...alumno, asistencia: estado } : alumno
    );
    setAlumnos(actualizados);
  };

  const enviarAsistencia = () => {
    if (!cursoSeleccionado || !fechaSeleccionada) {
      alert('⚠️ Por favor selecciona curso y fecha.');
      return;
    }

    if (fechaSeleccionada !== hoy) {
      alert('⚠️ Solo puedes marcar asistencia para la fecha de hoy.');
      return;
    }

    console.log('Curso:', cursoSeleccionado);
    console.log('Fecha:', fechaSeleccionada);
    console.log('Asistencia:', alumnos);
    alert('✅ Asistencia guardada correctamente');
  };

  return (
    <>
      <NavbarPag />
      <div className="asistencia-container">
        <h2 className="titulo">📋 Registro de Asistencia</h2>

        <div className="filtros">
          <div className="filtro-item">
            <label>Curso:</label>
            <select value={cursoSeleccionado} onChange={handleCursoChange}>
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.id_curso} value={curso.id_curso}>
                  {curso.nombre_curso}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-item">
            <label>Fecha:</label>
            <input
              type="date"
              value={fechaSeleccionada}
              max={hoy}
              min={hoy}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </div>
        </div>

        {alumnos.length > 0 && (
          <>
            <table className="asistencia-tabla">
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.id}>
                    <td>{alumno.nombre}</td>
                    <td>
                      <span
                        className={
                          alumno.asistencia === 'Presente'
                            ? 'estado presente'
                            : alumno.asistencia === 'Ausente'
                            ? 'estado ausente'
                            : alumno.asistencia === 'Justificado'
                            ? 'estado justificado'
                            : 'estado sin-marcar'
                        }
                      >
                        {alumno.asistencia || 'Sin marcar'}
                      </span>
                    </td>
                    <td>
                      <div className="botones-estado">
                        <button
                          className="btn presente"
                          onClick={() => actualizarAsistencia(alumno.id, 'Presente')}
                        >
                          Presente
                        </button>
                        <button
                          className="btn ausente"
                          onClick={() => actualizarAsistencia(alumno.id, 'Ausente')}
                        >
                          Ausente
                        </button>
                        <button
                          className="btn justificado"
                          onClick={() => actualizarAsistencia(alumno.id, 'Justificado')}
                        >
                          Justificado
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="btn-guardar"
              onClick={enviarAsistencia}
              disabled={!cursoSeleccionado}
            >
              💾 Guardar Asistencia
            </button>
          </>
        )}
      </div>
    </>
  );
}
