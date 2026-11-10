import { useParams, useNavigate } from 'react-router-dom';
import { useInventario } from '../context/useInventario';
import { formatearPrecio } from '../utils/formato';

function DetalleProducto() {
    const { id } = useParams();
    const { productos, agregarAlCarrito } = useInventario();
    const navigate = useNavigate();

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Producto no encontrado</h2>
                <button onClick={() => navigate('/inventario')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    Volver al Inventario
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
            <button
                onClick={() => navigate('/inventario')}
                className="text-blue-600 font-semibold hover:underline mb-6 inline-block"
            >
                &larr; Volver al Listado
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-72 w-full rounded-lg overflow-hidden shadow bg-gray-100">
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                </div>

                <div>
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {producto.tipo}
                    </span>

                    <h1 className="text-3xl font-extrabold text-gray-900 mt-3">{producto.nombre}</h1>
                    <p className="text-lg text-gray-600 mt-1">Marca: <span className="font-medium text-gray-800">{producto.marca}</span></p>

                    <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Precio Unitario</p>
                            <p className="text-2xl font-bold text-green-700">{formatearPrecio(producto.precio)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Disponibilidad</p>
                            <p className={`text-xl font-bold ${producto.stock > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                {producto.stock} un.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={producto.stock <= 0}
                        className={`w-full py-3 rounded-lg font-semibold transition duration-200 text-white ${producto.stock > 0
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-md'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock Disponible'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;