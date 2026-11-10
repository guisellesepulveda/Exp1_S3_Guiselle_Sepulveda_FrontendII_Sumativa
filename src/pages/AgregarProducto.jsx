import { useState, useRef, useEffect } from 'react';
import { useInventario } from '../context/useInventario';
import FormField from '../components/FormField';

function AgregarProducto() {
    const { agregarProducto } = useInventario();

    const [formData, setFormData] = useState({
        nombre: '',
        marca: '',
        tipo: '',
        precio: '',
        stock: '',
        imagen: ''
    });

    const [errors, setErrors] = useState({});
    const [mensajeExito, setMensajeExito] = useState('');

    const successMessageRef = useRef(null);

    useEffect(() => {
        if (mensajeExito && successMessageRef.current) {
            successMessageRef.current.focus();
        }
    }, [mensajeExito]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensajeExito('');

        // Validación básica
        if (!formData.nombre.trim() || !formData.marca.trim() || !formData.tipo.trim()) {
            setErrors({ general: 'Por favor complete los campos obligatorios.' });
            return;
        }

        const nuevoItem = {
            id: crypto.randomUUID(),
            nombre: formData.nombre.trim(),
            marca: formData.marca.trim(),
            tipo: formData.tipo.trim(),
            // Si el campo viene vacío se usa un valor por defecto; un 0 explícito se respeta.
            precio: formData.precio === '' ? 1500 : Math.max(0, Number(formData.precio)),
            stock: formData.stock === '' ? 10 : Math.max(0, Math.floor(Number(formData.stock))),
            imagen: formData.imagen.trim() || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
        };

        agregarProducto(nuevoItem);

        setFormData({ nombre: '', marca: '', tipo: '', precio: '', stock: '', imagen: '' });
        setErrors({});
        setMensajeExito('¡Artículo agregado exitosamente al inventario!');
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar Nuevo Artículo</h2>

            <div aria-live="polite" className="sr-only">
                {mensajeExito}
            </div>

            {mensajeExito && (
                <div
                    tabIndex={-1}
                    ref={successMessageRef}
                    className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center outline-none focus:ring-2 focus:ring-green-500 font-medium"
                >
                    {mensajeExito}
                </div>
            )}

            {errors.general && (
                <div
                    role="alert"
                    className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center font-medium"
                >
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <FormField
                    label="Nombre del Producto"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Arroz Grado 1"
                    required
                />

                <FormField
                    label="Marca"
                    id="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    placeholder="Ej. Tucapel"
                    required
                />

                <FormField
                    label="Categoría / Tipo"
                    id="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    placeholder="Ej. Abarrotes"
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Precio ($)"
                        id="precio"
                        type="number"
                        value={formData.precio}
                        onChange={handleChange}
                        placeholder="Ej. 1290"
                    />

                    <FormField
                        label="Stock Inicial"
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Ej. 20"
                    />
                </div>

                <FormField
                    label="URL de Imagen (Opcional)"
                    id="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md">
                    Guardar en Inventario
                </button>
            </form>
        </div>
    );
}

export default AgregarProducto;