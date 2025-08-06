import { useState } from 'react';
import '../style/Asistencia.css';

const cursos = {
  Matematicas: [
    { id: 1, nombre: 'Juan Pérez', asistencia: '' },
    { id: 2, nombre: 'Ana González', asistencia: '' },
  ],
  Historia: [
    { id: 3, nombre: 'Carlos Ramírez', asistencia: '' },
    { id: 4, nombre: 'Lucía Martínez', asistencia: '' },
  ],
};

export default function Asistencia() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [alumnos, setAlumnos] = useState([]);

  const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const handleCursoChange = (e) => {
    const curso = e.target.value;
    setCursoSeleccionado(curso);
    setAlumnos(cursos[curso] || []);
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
    <div className="asistencia-container">
      <h2 className="titulo">📋 Registro de Asistencia</h2>

      <div className="filtros">
        <div className="filtro-item">
          <label>Curso:</label>
          <select value={cursoSeleccionado} onChange={handleCursoChange}>
            <option value="">Selecciona un curso</option>
            {Object.keys(cursos).map((curso) => (
              <option key={curso} value={curso}>
                {curso}
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
  );
}
