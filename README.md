# Supermercado El Trébol - Sistema de Gestión de Inventario 🛒

Aplicación web frontend desarrollada con **React**, **Vite**, **Tailwind CSS** y **React Router DOM**, diseñada para gestionar eficientemente el inventario, control de stock y carrito de compras de un supermercado.

---

## 🚀 Funcionalidades Principales

1. **Pantalla de Inicio:** Bienvenida y presentación general del sistema.
2. **Quiénes Somos y Contacto:** Secciones informativas institucionales.
3. **Listado de Inventario:** Visualización completa de los productos registrados con sus respectivas imágenes, categorías, precios y stock disponible.
4. **Filtro Dinámico por Categoría:** Selector interactivo para filtrar productos en tiempo real sin perder los datos originales del inventario.
5. **Pantalla de Detalle de Producto:** Vista detallada al seleccionar un artículo, con opción de agregarlo al carrito (descontando automáticamente el stock general).
6. **Carrito de Compras:** Gestión de artículos seleccionados, permitiendo aumentar o disminuir unidades y sincronizando el inventario en tiempo real.
7. **Ingreso de Artículos:** Formulario validado con accesibilidad y diseño adaptable para registrar nuevos productos.

---

## 🛠️ Tecnologías Utilizadas

* **React (v19)** - Biblioteca de JavaScript para la construcción de interfaces de usuario.
* **Vite** - Entorno de desarrollo rápido y empaquetador moderno.
* **Tailwind CSS (v4)** - Framework de CSS utility-first para un diseño responsive y profesional.
* **React Router DOM** - Enrutamiento dinámico de páginas y layouts.

---

## 📂 Estructura del Proyecto

```text
super-trebol-inventario/
├── public/
├── src/
│   ├── assets/         # Recursos visuales e imágenes (Logo)
│   ├── components/     # Componentes reutilizables (Navbar, Footer, Layout, FormField)
│   ├── context/        # Estado global (InventarioContext, contexto, hook useInventario)
│   ├── utils/          # Utilidades (formato de precios)
│   ├── pages/          # Pantallas principales (Inicio, QuienesSomos, Contacto, ListaInventario, DetalleProducto, AgregarProducto, Carrito)
│   ├── App.jsx         # Configuración de rutas principales
│   ├── main.jsx        # Punto de entrada de React
│   └── index.css       # Estilos globales y directivas de Tailwind
├── index.html
├── package.json
└── tailwind.config.js