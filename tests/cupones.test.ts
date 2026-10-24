import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-04: Usar cupones de descuento', () => {
  test('CA1: Aplica 10% de descuento con SABANERO10 si el subtotal es mayor o igual a $50.000', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Queso', precio: 60000, tarifaIva: 0, stock: 10 }, 1);
    carrito.aplicarCupon('SABANERO10');

    expect(carrito.obtenerDescuentoCupon()).toBe(6000);
  });

  test('CA1/ERR: Lanza error si se intenta aplicar SABANERO10 con subtotal menor a $50.000', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Leche', precio: 20000, tarifaIva: 0, stock: 10 }, 1);

    expect(() => carrito.aplicarCupon('SABANERO10')).toThrow();
  });

  test('CA2: Cupón ENVIOGRATIS establece el costo de envío a $0', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Carne', precio: 30000, tarifaIva: 0, stock: 10 }, 1);
    carrito.aplicarCupon('ENVIOGRATIS');

    expect(carrito.calcularCostoEnvio('Sincelejo')).toBe(0);
  });

  test('CA3: Lanza error al intentar aplicar un cupón inexistente o vencido', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Carne', precio: 30000, tarifaIva: 0, stock: 10 }, 1);

    expect(() => carrito.aplicarCupon('CUPON_INVALIDO')).toThrow();
  });

  test('CA4: Aplica solo el descuento mayor si coexiste con descuento por volumen', () => {
    const carrito = new CarritoCompras();
    // Subtotal = $200.000 -> Descuento por volumen (5%) = $10.000
    carrito.agregarProducto({ id: 'P01', nombre: 'Televisor', precio: 200000, tarifaIva: 0.19, stock: 10 }, 1);
    carrito.aplicarCupon('SABANERO10'); // Descuento por cupón (10%) = $20.000

    expect(carrito.obtenerDescuentoTotal()).toBe(20000);
  });
});