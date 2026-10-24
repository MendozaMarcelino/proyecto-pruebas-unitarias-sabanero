export interface Producto {
  id: string;
  nombre: string;
  stock: number;
  precio: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export class CarritoCompras {
  private items: ItemCarrito[] = [];

  public agregarProducto(producto: Producto, cantidad: number): void {
    if (cantidad >= 1 && cantidad <= 50 && cantidad <= producto.stock) {
      this.items.push({ producto, cantidad });
    }
  }

  public obtenerItems(): ItemCarrito[] {
    return this.items;
  }
}