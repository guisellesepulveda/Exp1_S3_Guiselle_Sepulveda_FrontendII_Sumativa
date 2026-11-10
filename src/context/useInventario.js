import { useContext } from 'react';
import { InventarioContext } from './contexto';

// Hook personalizado para acceder al estado global del inventario y del carrito.
export function useInventario() {
    const contexto = useContext(InventarioContext);
    if (!contexto) {
        throw new Error('useInventario debe usarse dentro de <InventarioProvider>');
    }
    return contexto;
}
