// FinanzaAdmiV1.jsx
import NavbarPag from '../components/NavbarPag';
import '../style/FinanzasAdmi.css';

export default function FinanzaAdmiV1() {
  return (
    <>
    <NavbarPag/>
    <div className="finanzas-container">
      <div className="finanzas-content">
        <h2 className="finanzas-title">Panel de Finanzas - Administrador</h2>

        <input
          type="text"
          placeholder="Buscar por nombre o RUT"
          className="finanzas-search"
        />

        <div className="alumnos-lista">
          {[1, 2, 3].map((i) => (
            <div key={i} className="alumno-card">
              <div className="alumno-info">
                <div>
                  <p className="alumno-nombre">Nombre Alumno {i}</p>
                  <p className="alumno-rut">RUT: 11.111.111-{i}</p>
                </div>
                <div className="alumno-finanzas">
                  <p className="deuda"><span>💸</span>Deuda total: $50.000</p>
                  <p className="pagado"><span>✅</span>Pagado: $100.000</p>
                </div>
              </div>

              <div className="alumno-detalles">
                <p className="titulo-detalles">Pagos y Deudas:</p>
                <ul className="lista-detalles">
                  <li className="pago">Pago Matrícula - $50.000</li>
                  <li className="deuda-item">Deuda Abril - $25.000</li>
                  <li className="deuda-item">Deuda Mayo - $25.000</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
