import { useEffect, useState } from "react";
import '../style/PerfilA.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faIdCard,
  faEnvelope,
  faLock,
  faKey,
  faMoneyBillWave,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';

import NavbarPag from '../components/NavbarPag';
import { useAdmin } from '../context/AdminContext'; // Ajusta la ruta según tu proyecto

const COLORS = ['#4caf50', '#f44336', '#2196f3']; // verde, rojo, azul

const AlumnoPortal = () => {
  const { rut } = useAdmin();

  // Estado para datos del alumno
  const [alumno, setAlumno] = useState<{
    nombre_completo: string;
    rut: string;
    correo: string;
    // Puedes agregar más campos según tu backend
  } | null>(null);

  // Estados para cursos (resumen), deuda y asistencia (puedes traerlos del backend o dejar estáticos)
  const [cursos, setCursos] = useState([
    { asignatura: "Matemáticas", nota: 6.0 },
    { asignatura: "Lenguaje", nota: 5.5 },
    { asignatura: "Historia", nota: 6.2 },
  ]);

  const [deuda, setDeuda] = useState(150000); // Ejemplo deuda

  const [asistenciaData, setAsistenciaData] = useState([
    { mes: 'Abr', asistencia: 68, inasistencia: 20, justificado: 12 },
    { mes: 'May', asistencia: 72, inasistencia: 15, justificado: 13 },
    { mes: 'Jun', asistencia: 75, inasistencia: 18, justificado: 7 },
    { mes: 'Jul', asistencia: 80, inasistencia: 12, justificado: 8 },
    { mes: 'Ago', asistencia: 78, inasistencia: 10, justificado: 12 },
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Asistencia', value: 75 },
    { name: 'Inasistencia', value: 15 },
    { name: 'Justificado', value: 10 },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Rut recibido del contexto:", rut);
    if (!rut) return;

    setLoading(true);
    fetch(`http://localhost:3001/alumnos/${rut}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.alumno) {
          setAlumno(data.alumno);

          // Opcional: actualizar cursos, deuda, asistencia si vienen del backend
          if (data.cursos) setCursos(data.cursos);
          if (data.deuda) setDeuda(data.deuda);
          if (data.asistenciaData) setAsistenciaData(data.asistenciaData);
          if (data.pieData) setPieData(data.pieData);

          setError(null);
        } else {
          setError("Alumno no encontrado");
        }
      })
      .catch(() => setError("Error al obtener datos"))
      .finally(() => setLoading(false));
  }, [rut]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!alumno) return <p>No hay datos del alumno.</p>;

  return (
    <>
      <NavbarPag />
      <div className="portal-container">

        {/* PANEL IZQUIERDO */}
        <div className="left-panel">

          {/* DATOS PERSONALES */}
          <div className="card datos-personales">
            <h2 className="seccion-titulo"><FontAwesomeIcon icon={faUser} /> Datos del Alumno</h2>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faUser} /> Nombre:</span>
              <span className="valor">{alumno.nombre_completo}</span>
            </div>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faIdCard} /> RUT:</span>
              <span className="valor">{alumno.rut}</span>
            </div>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faEnvelope} /> Correo:</span>
              <span className="valor">{alumno.correo}</span>
            </div>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faLock} /> Contraseña:</span>
              <span className="valor">********</span>
            </div>
            <button className="btn-secundario" style={{ marginTop: '10px' }}>
              <FontAwesomeIcon icon={faKey} /> Cambiar Contraseña
            </button>
          </div>

          {/* RESUMEN CURSOS */}
          <div className="card resumen-cursos">
            <h3 className="seccion-titulo"><FontAwesomeIcon icon={faClipboardList} /> Resumen de ASIGNATURAS</h3>
            <table className="tabla-cursos">
              <thead>
                <tr>
                  <th>ASIGNATURAS</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {cursos.map(({ asignatura, nota }) => (
                  <tr key={asignatura}>
                    <td>{asignatura}</td>
                    <td>{nota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn-primario">
              <FontAwesomeIcon icon={faMoneyBillWave} /> Ver Deuda (${deuda.toLocaleString()})
            </button>
          </div>

        </div>

        {/* PANEL DERECHO: ASISTENCIA */}
        <div className="right-panel card">
          <h3><FontAwesomeIcon icon={faClipboardList} /> Resumen de Asistencia</h3>

          <div className="grafico-torta" style={{ marginTop: 10 }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <button className="btn-secundario" style={{ marginTop: 10 }}>Ver Detalle</button>

          <h4 style={{ marginTop: '30px' }}><FontAwesomeIcon icon={faClipboardList} /> Asistencia Mensual</h4>
          <div className="grafico-barras" style={{ marginTop: 10 }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={asistenciaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="asistencia" stackId="a" fill="#4caf50" name="Asistencia" />
                <Bar dataKey="inasistencia" stackId="a" fill="#f44336" name="Inasistencia" />
                <Bar dataKey="justificado" stackId="a" fill="#2196f3" name="Justificado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </>
  );
};

export default AlumnoPortal;