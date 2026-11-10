import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useInventario } from '../context/useInventario';
// Importamos el logo desde la carpeta assets
import logoTrebol from '../assets/logo-trebol.png';

const enlaces = [
    { to: '/', texto: 'Inicio', end: true },
    { to: '/quienes-somos', texto: 'Quiénes Somos' },
    { to: '/contacto', texto: 'Contacto' },
    { to: '/inventario', texto: 'Inventario' },
    { to: '/agregar-producto', texto: 'Ingresar Artículo' },
];

function Navbar() {
    const { carrito } = useInventario();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const totalItemsCarrito = carrito.reduce((acc, item) => acc + item.cantidadEnCarrito, 0);

    const linkClass = ({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
            ? 'bg-blue-800 text-white shadow'
            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
        }`;

    const cerrarMenu = () => setMenuAbierto(false);

    const listaEnlaces = (
        <>
            {enlaces.map(({ to, texto, end }) => (
                <NavLink key={to} to={to} end={end} className={linkClass} onClick={cerrarMenu}>
                    {texto}
                </NavLink>
            ))}
            <NavLink to="/carrito" className={linkClass} onClick={cerrarMenu}>
                Carrito
                {totalItemsCarrito > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {totalItemsCarrito}
                    </span>
                )}
            </NavLink>
        </>
    );

    return (
        <nav className="bg-blue-900 shadow-md py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo y Nombre del Supermercado */}
                    <NavLink to="/" onClick={cerrarMenu} className="flex items-center space-x-3 flex-shrink-0">
                        <img
                            src={logoTrebol}
                            alt="Supermercado El Trébol Logo"
                            className="h-10 w-10 object-contain rounded-full bg-white p-1 shadow"
                        />
                        <span className="text-white font-bold text-xl tracking-wide">El Trébol</span>
                    </NavLink>

                    {/* Enlaces de Navegación (escritorio) */}
                    <div className="hidden lg:flex space-x-2 items-center">
                        {listaEnlaces}
                    </div>

                    {/* Botón hamburguesa (móvil y tablet) */}
                    <button
                        type="button"
                        onClick={() => setMenuAbierto(abierto => !abierto)}
                        aria-expanded={menuAbierto}
                        aria-controls="menu-movil"
                        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                        className="lg:hidden relative inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            {menuAbierto
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                        {!menuAbierto && totalItemsCarrito > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full font-bold">
                                {totalItemsCarrito}
                            </span>
                        )}
                    </button>
                </div>

                {/* Menú desplegable (móvil y tablet) */}
                {menuAbierto && (
                    <div id="menu-movil" className="lg:hidden flex flex-col space-y-1 pb-3">
                        {listaEnlaces}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
