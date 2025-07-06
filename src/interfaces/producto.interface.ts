export interface Producto {
    categoria:      string;
    nombre:         string;
    precio_usd:     string;
    precio_guarani: string;
    precio_pesos:   string;
}

export interface ProductosData {
    productos: Producto[];
}