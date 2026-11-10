import { createContext } from 'react';

// Objeto de contexto compartido. Se define en un archivo aparte para que
// InventarioContext.jsx solo exporte componentes (requisito de Fast Refresh).
export const InventarioContext = createContext(null);
