import { useState } from 'react';
import '../style/FinanzaAlum.css';
import NavbarPag from '../components/NavbarPag';

const FinanzasAlumno = () => {
  const [filtro, setFiltro] = useState({ desde: '', hasta: '' });

  const transacciones = [
    { fecha: '2025-08-01', tipo: 'Ingreso', descripcion: 'Pago consulta', monto: 50000 },
    { fecha: '2025-08-03', tipo: 'Gasto', descripcion: 'Compra materiales', monto: -30000 },
    { fecha: '2025-08-04', tipo: 'Ingreso', descripcion: 'Ortodoncia', monto: 100000 },
    { fecha: '2025-08-06', tipo: 'Gasto', descripcion: 'Sueldo secretaria', monto: -200000 },
  ];

  const ingresos = transacciones
    .filter(t => t.monto > 0)
    .reduce((acc, t) => acc + t.monto, 0);
  const gastos = transacciones
    .filter(t => t.monto < 0)
    .reduce((acc, t) => acc + t.monto, 0);
  const balance = ingresos + gastos;

  return (
    <>
    <NavbarPag/>
    <div className="finanzas-wrapper">
      <h1 className="titulo">Panel de Finanzas</h1>

      <div className="finanzas-resumen">
        <div className="card ingreso">
          <h3>Ingresos</h3>
          <p>${ingresos.toLocaleString()}</p>
        </div>
        <div className="card gasto">
          <h3>Gastos</h3>
          <p>${Math.abs(gastos).toLocaleString()}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>${balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="filtro-fechas">
        <label htmlFor="desde">Desde:</label>
        <input
          type="date"
          id="desde"
          value={filtro.desde}
          onChange={(e) => setFiltro({ ...filtro, desde: e.target.value })}
        />
        <label htmlFor="hasta">Hasta:</label>
        <input
          type="date"
          id="hasta"
          value={filtro.hasta}
          onChange={(e) => setFiltro({ ...filtro, hasta: e.target.value })}
        />
        <button className="btn-filtrar">Filtrar</button>
      </div>

      <div className="tabla-transacciones">
        <h3>Transacciones</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t, index) => (
              <tr key={index}>
                <td>{t.fecha}</td>
                <td>{t.tipo}</td>
                <td>{t.descripcion}</td>
                <td style={{ color: t.monto < 0 ? 'red' : 'green' }}>
                  {t.monto < 0 ? '-' : ''}${Math.abs(t.monto).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default FinanzasAlumno;
