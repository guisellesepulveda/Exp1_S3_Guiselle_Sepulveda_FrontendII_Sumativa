import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/useInventario';
import { formatearPrecio } from '../utils/formato';

function ListaInventario() {
    const { productos } = useInventario();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

    const categorias = ['Todas', ...new Set(productos.map(p => p.tipo))];

    // Se filtra una copia derivada; el arreglo original "productos" nunca se modifica.
    const productosFiltrados = categoriaSeleccionada === 'Todas'
        ? productos
        : productos.filter(p => p.tipo === categoriaSeleccionada);

    return (
        <div className="max-w-6xl mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-blue-900">Inventario de Productos</h2>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <label htmlFor="filtro-categoria" className="font-semibold text-gray-700">Filtrar por Categoría:</label>
                    <select
                        id="filtro-categoria"
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        {categorias.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {productosFiltrados.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No hay productos disponibles en esta categoría.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productosFiltrados.map((item) => (
                        <Link
                            key={item.id}
                            to={`/producto/${item.id}`}
                            aria-label={`Ver detalle de ${item.nombre}`}
                            className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                        >
                            <div className="h-48 w-full overflow-hidden bg-gray-100">
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow justify-between">
                                <div>
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                                        {item.tipo}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800 mt-3">{item.nombre}</h3>
                                    <p className="text-gray-600 text-sm">Marca: <span className="font-medium">{item.marca}</span></p>
                                    <p className="text-gray-600 text-sm mt-1">Precio: <span className="font-semibold text-green-700">{formatearPrecio(item.precio)}</span></p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                    <span className={`text-sm font-bold ${item.stock > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                        Stock: {item.stock} unidades
                                    </span>
                                    <span className="text-sm text-blue-600 font-semibold group-hover:underline">Ver Detalle &rarr;</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaInventario;
