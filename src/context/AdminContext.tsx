import { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  tipoUsuario: string | null;
  nombreUsuario: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(() => {
    return localStorage.getItem("tipoUsuario");
  });
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(() => {
    return localStorage.getItem("nombreUsuario");
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3001/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();

      if (data.success && data.tipo_usuario) {
        setTipoUsuario(data.tipo_usuario);
        setNombreUsuario(data.nombre || null);

        // Guardar en localStorage
        localStorage.setItem("tipoUsuario", data.tipo_usuario);
        localStorage.setItem("nombreUsuario", data.nombre || "");

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error de login:", error);
      return false;
    }
  };

  const logout = () => {
    setTipoUsuario(null);
    setNombreUsuario(null);

    // Limpiar localStorage
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("nombreUsuario");
  };

  return (
    <AdminContext.Provider value={{ tipoUsuario, nombreUsuario, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin debe usarse dentro de AdminProvider");
  return context;
}
