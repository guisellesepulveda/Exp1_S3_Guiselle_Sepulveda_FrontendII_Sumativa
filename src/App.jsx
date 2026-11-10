import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventarioProvider } from './context/InventarioContext';
import Layout from './components/Layout';

import Inicio from './pages/Inicio';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import ListaInventario from './pages/ListaInventario';
import DetalleProducto from './pages/DetalleProducto';
import AgregarProducto from './pages/AgregarProducto';
import Carrito from './pages/Carrito';

function App() {
  return (
    <InventarioProvider>
      {/* basename = ruta base de Vite ("/" en local, "/<repo>/" en GitHub Pages) */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="quienes-somos" element={<QuienesSomos />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="inventario" element={<ListaInventario />} />
            <Route path="producto/:id" element={<DetalleProducto />} />
            <Route path="agregar-producto" element={<AgregarProducto />} />
            <Route path="carrito" element={<Carrito />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </InventarioProvider>
  );
}

export default App;