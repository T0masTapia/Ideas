import { useState, useEffect } from 'react';
import '../style/CrearU.css';
import NavbarPag from '../components/NavbarPag';

export default function CrearU() {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [fono, setFono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [forzarPasswordSegura, setForzarPasswordSegura] = useState(false); // checkbox nuevo
    const [alumnos, setAlumnos] = useState<any[]>([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const cargarAlumnos = async () => {
            try {
                const res = await fetch('http://localhost:3001/alumnos');
                const data = await res.json();
                if (data.success && Array.isArray(data.alumnos)) {
                    const alumnosFormateados = data.alumnos.map((a: any) => ({
                        rut: a.rut ?? '',
                        nombre: a.nombre_completo ?? '',
                        fono: a.fono ?? '',
                        direccion: a.direccion ?? '',
                        correo: a.correo ?? '',
                    }));
                    setAlumnos(alumnosFormateados);
                } else {
                    alert('Error al obtener alumnos del servidor');
                }
            } catch (error) {
                alert('Error de conexión con el backend');
                console.error(error);
            }
        };
        cargarAlumnos();
    }, []);

    const validar = () => {
        const nuevosErrores: { [key: string]: string } = {};

        if (!rut || rut.length < 9) {
            nuevosErrores.rut = 'RUT inválido (mínimo 9 caracteres)';
        }
        if (!nombre || nombre.trim().length < 3) {
            nuevosErrores.nombre = 'Nombre debe tener al menos 3 caracteres';
        }
        if (!/^\d{8,}$/.test(fono)) {
            nuevosErrores.fono = 'Contacto debe tener al menos 8 números';
        }
        if (!direccion || direccion.trim() === '') {
            nuevosErrores.direccion = 'Dirección es requerida';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            nuevosErrores.correo = 'Correo electrónico inválido';
        }
        if (!password || password.length < 6) {
            nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        // Por ahora no se añade lógica usando forzarPasswordSegura

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validar()) return;

        const nuevoAlumno = { rut, nombre_completo: nombre, fono, direccion, correo, password };

        try {
            const res = await fetch('http://localhost:3001/alumnos/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoAlumno),
            });

            const data = await res.json();

            if (data.success) {
                setAlumnos([...alumnos, { rut, nombre, fono, direccion, correo }]);
                setRut('');
                setNombre('');
                setFono('');
                setDireccion('');
                setCorreo('');
                setPassword('');
                setMostrarPassword(false);
                setForzarPasswordSegura(false); // reset checkbox al enviar
                setErrores({});
                alert('Alumno registrado correctamente');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            alert('Error de conexión con el backend');
            console.error(error);
        }
    };

    const alumnosFiltrados = alumnos.filter((alumno) =>
        (alumno.nombre ?? '').toLowerCase().includes(filtroNombre.toLowerCase())
    );

    return (
        <>
        <NavbarPag/>
            <div className="matricula-wrapper">
                <div className="matricula-container">
                    <h2>Ingresar Alumno</h2>
                    <form onSubmit={handleSubmit} className="matricula-form" noValidate>
                        <label>
                            RUT:
                            <input
                                type="text"
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                                className={errores.rut ? 'input-error' : ''}
                            />
                            {errores.rut && <small className="error-text">{errores.rut}</small>}
                        </label>

                        <label>
                            Nombre:
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className={errores.nombre ? 'input-error' : ''}
                            />
                            {errores.nombre && <small className="error-text">{errores.nombre}</small>}
                        </label>

                        <label>
                            Contacto:
                            <input
                                type="text"
                                value={fono}
                                onChange={(e) => setFono(e.target.value)}
                                className={errores.fono ? 'input-error' : ''}
                            />
                            {errores.fono && <small className="error-text">{errores.fono}</small>}
                        </label>

                        <label>
                            Dirección:
                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className={errores.direccion ? 'input-error' : ''}
                            />
                            {errores.direccion && <small className="error-text">{errores.direccion}</small>}
                        </label>

                        <label>
                            Correo electrónico:
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className={errores.correo ? 'input-error' : ''}
                            />
                            {errores.correo && <small className="error-text">{errores.correo}</small>}
                        </label>

                        <label>
                            Contraseña:
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={mostrarPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={errores.password ? 'input-error' : ''}
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2em',
                                        padding: 0,
                                    }}
                                    aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {mostrarPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errores.password && <small className="error-text">{errores.password}</small>}
                        </label>

                        {/* Checkbox para forzar contraseña segura (sin lógica) */}
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={forzarPasswordSegura}
                                onChange={() => setForzarPasswordSegura(!forzarPasswordSegura)}
                            />
                            <span></span> Forzar Cambio de contraseña
                        </label>

                        <button type="submit" className="btn-matricular" style={{ marginTop: '15px' }}>
                            Matricular
                        </button>
                    </form>
                </div>

                <div className="tabla-alumnos">
                    <h3>Alumnos Ingresados al Sistema</h3>

                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        className="input-filtro"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th>RUT</th>
                                <th>Nombre</th>
                                <th>Contacto</th>
                                <th>Dirección</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnosFiltrados.map((alumno, index) => (
                                <tr key={index}>
                                    <td>{alumno.rut}</td>
                                    <td>{alumno.nombre}</td>
                                    <td>{alumno.fono}</td>
                                    <td>{alumno.direccion}</td>
                                    <td>{alumno.correo}</td>
                                </tr>
                            ))}
                            {alumnosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center' }}>
                                        No se encontraron alumnos
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
