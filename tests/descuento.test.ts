import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-03: Aplicar descuento por volumen', () => {
  test('CA1: Sin descuento si el subtotal es menor a 200000', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Arroz', stock: 10, precio: 100000 };
    carrito.agregarProducto(producto, 1);

    expect(carrito.calcularDescuentoVolumen()).toBe(0);
  });

  test('CA2: Aplica 5% de descuento si el subtotal es mayor o igual a 200000 y menor a 500000', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Televisor', stock: 10, precio: 300000 };
    carrito.agregarProducto(producto, 1);

    expect(carrito.calcularDescuentoVolumen()).toBe(15000); // 5% de 300.000
  });

  test('CA3: Aplica 10% de descuento si el subtotal es mayor o igual a 500000', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Nevera', stock: 10, precio: 500000 };
    carrito.agregarProducto(producto, 1);

    expect(carrito.calcularDescuentoVolumen()).toBe(50000); // 10% de 500.000
  });
});