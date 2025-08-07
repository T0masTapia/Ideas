import { BrowserRouter } from "react-router-dom"; // ⬅️ Importa BrowserRouter
import Rutas from "./components/Rutas";

function App() {
  return (
    <BrowserRouter> 
      <Rutas />
    </BrowserRouter>
  );
}

export default App;
