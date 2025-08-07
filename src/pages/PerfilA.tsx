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
  faBook,
  faEnvelope,
  faLock,
  faKey,
  faMoneyBillWave,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import NavbarPag from '../components/NavbarPag';

const asistenciaData = [
  { mes: 'Abr', asistencia: 68, inasistencia: 20, justificado: 12 },
  { mes: 'May', asistencia: 72, inasistencia: 15, justificado: 13 },
  { mes: 'Jun', asistencia: 75, inasistencia: 18, justificado: 7 },
  { mes: 'Jul', asistencia: 80, inasistencia: 12, justificado: 8 },
  { mes: 'Ago', asistencia: 78, inasistencia: 10, justificado: 12 },
];

const pieData = [
  { name: 'Asistencia', value: 75 },
  { name: 'Inasistencia', value: 15 },
  { name: 'Justificado', value: 10 },
];

const COLORS = ['#4caf50', '#f44336', '#2196f3']; // verde, rojo, azul

const AlumnoPortal = () => {
  return (
    <>
      <NavbarPag />
      <div className="portal-container">
        <div className="left-panel">

          {/* DATOS PERSONALES */}
          <div className="card datos-personales">
            <h2 className="seccion-titulo"><FontAwesomeIcon icon={faUser} /> Datos del Alumno</h2>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faUser} /> Nombre:</span>
              <span className="valor">Juan Pérez</span>
            </div>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faIdCard} /> RUT:</span>
              <span className="valor">12.345.678-9</span>
            </div>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faBook} /> Curso:</span>
              <span className="valor">4° Medio A</span>
            </div>
            <div className="dato">
              <span className="etiqueta"><FontAwesomeIcon icon={faEnvelope} /> Correo:</span>
              <span className="valor">juan.perez@email.com</span>
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
            <h3 className="seccion-titulo"><FontAwesomeIcon icon={faClipboardList} /> Resumen de ASIGNATURAAAAS</h3>
            <table className="tabla-cursos">
              <thead>
                <tr>
                  <th>ASIGNATURAS</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Matemáticas</td>
                  <td>6.0</td>
                </tr>
                <tr>
                  <td>Lenguaje</td>
                  <td>5.5</td>
                </tr>
                <tr>
                  <td>Historia</td>
                  <td>6.2</td>
                </tr>
              </tbody>
            </table>
            <button className="btn-primario"><FontAwesomeIcon icon={faMoneyBillWave} /> Ver Deuda</button>
          </div>
        </div>

        {/* PANEL DERECHO: ASISTENCIA */}
        <div className="right-panel card">
          <h3><FontAwesomeIcon icon={faClipboardList} /> Resumen de Asistencia</h3>

          <div className="grafico-torta">
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
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <button className="btn-secundario">Ver Detalle</button>

          <h4 style={{ marginTop: '30px' }}><FontAwesomeIcon icon={faClipboardList} /> Asistencia Mensual</h4>
          <div className="grafico-barras">
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
