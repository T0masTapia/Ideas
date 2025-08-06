import { BrowserRouter } from "react-router-dom"; // ⬅️ Importa BrowserRouter
import Rutas from "./components/Rutas";

function App() {
  return (
    <BrowserRouter> {/* ⬅️ Envuelve tus rutas aquí */}
      <Rutas />
    </BrowserRouter>
  );
}

export default App;
