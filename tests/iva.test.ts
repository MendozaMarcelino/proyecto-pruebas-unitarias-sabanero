import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-02: Cálculo del IVA según la categoría del producto', () => {
  test('CA1: Calcula IVA del 19% para productos generales', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Televisor', precio: 100000, tarifaIva: 0.19, stock: 10 };
    carrito.agregarProducto(producto, 1);

    expect(carrito.calcularIvaTotal()).toBe(19000);
  });

  test('CA1: Aplica tarifa de IVA del 0% para productos de la canasta básica', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P02', nombre: 'Arroz', precio: 10000, tarifaIva: 0.00, stock: 10 };
    carrito.agregarProducto(producto, 2);

    expect(carrito.calcularIvaTotal()).toBe(0);
  });

  test('CA2: Calcula el IVA sobre el valor con descuento aplicado', () => {
    const carrito = new CarritoCompras();
    // Subtotal $200.000 -> Descuento 5% ($10.000) -> Base gravable $190.000 -> IVA 19% = $36.100
    const producto = { id: 'P03', nombre: 'Nevera', precio: 200000, tarifaIva: 0.19, stock: 10 };
    carrito.agregarProducto(producto, 1);

    expect(carrito.calcularIvaTotal()).toBe(36100);
  });
});