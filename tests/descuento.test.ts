import { describe, it, expect } from 'vitest';
import { CarritoCompras, Producto } from '../src/carrito';

describe('HU-03: Descuento por volumen de compra', () => {
  it('CA1: No debería aplicar descuento si el subtotal es menor a $200.000', () => {
    const carrito = new CarritoCompras();
    const producto: Producto = { id: 'P01', nombre: 'Queso', stock: 20, precio: 50000 };
    carrito.agregarProducto(producto, 2); // Subtotal: 100.000

    expect(carrito.calcularDescuentoVolumen()).toBe(0);
  });

  it('CA2: Debería aplicar 5% de descuento si el subtotal está entre $200.000 y $500.000', () => {
    const carrito = new CarritoCompras();
    const producto: Producto = { id: 'P02', nombre: 'Carne', stock: 20, precio: 50000 };
    carrito.agregarProducto(producto, 5); // Subtotal: 250.000

    expect(carrito.calcularDescuentoVolumen()).toBe(12500); // 5% de 250.000
  });
});