// Formatea un número como precio en pesos chilenos. Ej: 1290 -> "$1.290"
export function formatearPrecio(valor) {
    return `$${Number(valor).toLocaleString('es-CL')}`;
}
