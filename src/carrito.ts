export interface Producto {
  id: string;
  nombre: string;
  stock: number;
  precio: number;
}

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  tarifaIva?: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export class CarritoCompras {
  private items: ItemCarrito[] = [];
  private cuponAplicado: string | null = null;

  public agregarProducto(producto: Producto, cantidad: number): void {
    if (cantidad < 1 || cantidad > 50) {
      throw new Error('La cantidad debe estar entre 1 y 50 unidades');
    }

    if (cantidad > producto.stock) {
      throw new Error('Stock insuficiente');
    }

    const itemExistente = this.items.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      if (itemExistente.cantidad + cantidad > producto.stock) {
        throw new Error('Stock insuficiente para la cantidad acumulada');
      }
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  public obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  public calcularSubtotal(): number {
    return this.items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  public calcularDescuentoVolumen(): number {
    const subtotal = this.calcularSubtotal();
    if (subtotal >= 500000) {
      return subtotal * 0.10;
    } else if (subtotal >= 200000) {
      return subtotal * 0.05;
    }
    return 0;
  }

  public aplicarCupon(cupon: string): void {
    const subtotal = this.calcularSubtotal();
    if (cupon === 'SABANERO10') {
      if (subtotal < 50000) {
        throw new Error('El subtotal debe ser de al menos $50.000 para aplicar este cupón');
      }
      this.cuponAplicado = cupon;
    } else if (cupon === 'ENVIOGRATIS') {
      this.cuponAplicado = cupon;
    } else {
      throw new Error('Cupón inválido o vencido');
    }
  }

  public obtenerDescuentoCupon(): number {
    if (this.cuponAplicado === 'SABANERO10') {
      return this.calcularSubtotal() * 0.10;
    }
    return 0;
  }

  public obtenerDescuentoTotal(): number {
    const descuentoVolumen = this.calcularDescuentoVolumen();
    const descuentoCupon = this.obtenerDescuentoCupon();
    return Math.max(descuentoVolumen, descuentoCupon);
  }

  public calcularIvaTotal(): number {
    const subtotal = this.calcularSubtotal();
    const descuento = this.obtenerDescuentoTotal();
    const factorDescuento = subtotal > 0 ? (subtotal - descuento) / subtotal : 1;

    return this.items.reduce((totalIva, item) => {
      const tarifa = item.producto.tarifaIva ?? 0;
      const precioConDescuento = item.producto.precio * factorDescuento;
      return totalIva + Math.round(precioConDescuento * item.cantidad * tarifa);
    }, 0);
  }

  public calcularCostoEnvio(municipio: string = 'Sincelejo'): number {
    if (this.cuponAplicado === 'ENVIOGRATIS') {
      return 0;
    }

    const sumaProductosConIva = this.items.reduce((total, item) => {
      if ((item.producto.tarifaIva ?? 0) > 0) {
        return total + item.producto.precio * item.cantidad;
      }
      return total;
    }, 0);

    if (sumaProductosConIva >= 150000) {
      return 0;
    }

    return municipio.toLowerCase() === 'sincelejo' ? 8000 : 15000;
  }

  public calcularTotalPagar(municipio: string = 'Sincelejo'): number {
    const subtotal = this.calcularSubtotal();
    const descuento = this.obtenerDescuentoTotal();
    const iva = this.calcularIvaTotal();
    const envio = this.calcularCostoEnvio(municipio);

    return subtotal - descuento + iva + envio;
  }

  public calcularPuntosFidelidad(categoria: string = 'ESTANDAR'): number {
    const totalSinEnvio = this.calcularSubtotal() - this.obtenerDescuentoTotal() + this.calcularIvaTotal();
    const puntosBase = Math.floor(totalSinEnvio / 1000);

    return categoria === 'ORO' ? puntosBase * 2 : puntosBase;
  }
}