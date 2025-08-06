import { Route, Routes } from "react-router-dom";
import FinanzaAdmi from "../pages/FinanzaAdmi";
import FinanzasAlumno from "../pages/FinanzaAlumno";
import PerfilA from "../pages/PerfilA";
import Asistencia from "../pages/Asistencia";

export default function Rutas() {
  return (
    <Routes>
        <Route path="/finanzaAdmi" element={<FinanzaAdmi />} />
        <Route path="/finanzaAlumno" element={<FinanzasAlumno />} />
        <Route path="/PerfilA" element={<PerfilA />} />
        <Route path="/Asistencia" element={<Asistencia />} />
    </Routes>
  )
}
