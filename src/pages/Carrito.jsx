import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/useInventario';
import { formatearPrecio } from '../utils/formato';

function Carrito() {
    const { carrito, productos, actualizarCantidadCarrito, finalizarCompra } = useInventario();
    const [compraFinalizada, setCompraFinalizada] = useState(false);

    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidadEnCarrito), 0);

    // Stock disponible actual en el inventario general para un artículo del carrito
    const stockDisponible = (id) => productos.find(p => p.id === id)?.stock ?? 0;

    const handleFinalizar = () => {
        finalizarCompra();
        setCompraFinalizada(true);
    };

    const botonCantidad = 'w-9 h-9 flex items-center justify-center rounded font-bold text-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

    return (
        <div className="max-w-4xl mx-auto py-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Carrito de Compras</h2>

            {compraFinalizada && carrito.length === 0 && (
                <div role="status" className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center font-medium">
                    ¡Compra procesada con éxito! El inventario quedó actualizado.
                </div>
            )}

            {carrito.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
                    <p className="text-gray-600 text-lg mb-4">Tu carrito está vacío.</p>
                    <Link
                        to="/inventario"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Ir al Inventario
                    </Link>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                    <div className="divide-y divide-gray-200">
                        {carrito.map((item) => {
                            const stock = stockDisponible(item.id);
                            return (
                                <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                                        <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg border" />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{item.nombre}</h3>
                                            <p className="text-sm text-gray-500">Marca: {item.marca} | Precio: {formatearPrecio(item.precio)}</p>
                                            <p className={`text-xs font-medium ${stock > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                                Quedan {stock} en inventario
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => actualizarCantidadCarrito(item.id, -1)}
                                            aria-label={`Quitar una unidad de ${item.nombre}`}
                                            className={`${botonCantidad} bg-gray-200 hover:bg-gray-300 text-gray-800`}
                                        >
                                            −
                                        </button>
                                        <span className="font-bold text-lg w-8 text-center" aria-live="polite">{item.cantidadEnCarrito}</span>
                                        <button
                                            onClick={() => actualizarCantidadCarrito(item.id, 1)}
                                            disabled={stock <= 0}
                                            aria-label={`Agregar una unidad de ${item.nombre}`}
                                            title={stock <= 0 ? 'Sin stock disponible' : undefined}
                                            className={`${botonCantidad} ${stock > 0
                                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Subtotal</p>
                                        <p className="text-lg font-bold text-green-700">{formatearPrecio(item.precio * item.cantidadEnCarrito)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total General:</span>
                        <span className="text-2xl font-extrabold text-green-700">{formatearPrecio(totalCompra)}</span>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleFinalizar}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow transition duration-200"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrito;
