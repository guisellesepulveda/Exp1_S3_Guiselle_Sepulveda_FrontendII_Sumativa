import { useState } from 'react';
import { InventarioContext } from './contexto';

export function InventarioProvider({ children }) {
    // Estado inicial con imágenes representativas para cada producto
    const [productos, setProductos] = useState([
        {
            id: '1',
            nombre: 'Arroz Grado 1',
            marca: 'Tucapel',
            tipo: 'Abarrotes',
            stock: 25,
            precio: 1290,
            imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: '2',
            nombre: 'Leche Entera',
            marca: 'Colun',
            tipo: 'Lácteos',
            stock: 15,
            precio: 990,
            imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: '3',
            nombre: 'Dafne Detergente',
            marca: 'Omo',
            tipo: 'Limpieza',
            stock: 10,
            precio: 4590,
            imagen: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80'
        }
    ]);

    const [carrito, setCarrito] = useState([]);

    const agregarProducto = (nuevoProducto) => {
        setProductos(prev => [{
            ...nuevoProducto,
            stock: Number.isFinite(Number(nuevoProducto.stock)) ? Number(nuevoProducto.stock) : 10,
            precio: Number.isFinite(Number(nuevoProducto.precio)) ? Number(nuevoProducto.precio) : 1000,
            imagen: nuevoProducto.imagen || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
        }, ...prev]);
    };

    const agregarAlCarrito = (producto) => {
        if (producto.stock <= 0) return;

        setProductos(prev => prev.map(p => p.id === producto.id ? { ...p, stock: p.stock - 1 } : p));

        setCarrito(prev => {
            const existe = prev.find(item => item.id === producto.id);
            if (existe) {
                return prev.map(item => item.id === producto.id ? { ...item, cantidadEnCarrito: item.cantidadEnCarrito + 1 } : item);
            } else {
                return [...prev, { ...producto, cantidadEnCarrito: 1 }];
            }
        });
    };

    const actualizarCantidadCarrito = (id, delta) => {
        const itemCarrito = carrito.find(item => item.id === id);
        const productoInventario = productos.find(p => p.id === id);

        if (!itemCarrito) return;

        if (delta > 0) {
            if (productoInventario && productoInventario.stock > 0) {
                setProductos(prev => prev.map(p => p.id === id ? { ...p, stock: p.stock - 1 } : p));
                setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidadEnCarrito: item.cantidadEnCarrito + 1 } : item));
            }
        } else if (delta < 0) {
            setProductos(prev => prev.map(p => p.id === id ? { ...p, stock: p.stock + 1 } : p));
            if (itemCarrito.cantidadEnCarrito > 1) {
                setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidadEnCarrito: item.cantidadEnCarrito - 1 } : item));
            } else {
                setCarrito(prev => prev.filter(item => item.id !== id));
            }
        }
    };

    // Confirma la compra: el stock ya fue descontado al agregar al carrito,
    // así que solo se vacía el carrito (las unidades NO vuelven al inventario).
    const finalizarCompra = () => {
        setCarrito([]);
    };

    return (
        <InventarioContext.Provider value={{ productos, carrito, agregarProducto, agregarAlCarrito, actualizarCantidadCarrito, finalizarCompra }}>
            {children}
        </InventarioContext.Provider>
    );
}
