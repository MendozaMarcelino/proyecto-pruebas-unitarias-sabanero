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

  public calcularIVA(tasaIVA: number): number {
    let subtotal = 0;
    for (const item of this.items) {
      subtotal += item.producto.precio * item.cantidad;
    }
    return subtotal * tasaIVA;
  }

public subtotal: number = 0;
public descuentoCupon: number = 0;

public aplicarCupon(codigo: string): void {
  if (codigo === 'SABANERO10' && this.subtotal >= 50000) {
    this.descuentoCupon = this.subtotal * 0.10;
  } else {
    this.descuentoCupon = 0;
  }
}

public costoEnvio: number = 0;

public calcularEnvio(): void {
  if (this.subtotal >= 100000) {
    this.costoEnvio = 0;
  } else {
    this.costoEnvio = 10000;
  }
}
  public calcularDescuentoVolumen(): number {
  let subtotal = 0;
  for (const item of this.items) {
    subtotal += item.producto.precio * item.cantidad;
  }

  if (subtotal >= 500000) {
    return subtotal * 0.10; // 10% de descuento
  } else if (subtotal >= 200000) {
    return subtotal * 0.05; // 5% de descuento
  }
  return 0;
}
}