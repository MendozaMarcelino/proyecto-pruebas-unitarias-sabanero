import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-04: Usar cupones', () => {
  test('CA1: Aplicar cupon SABANERO10 otorga 10% de descuento con subtotal mayor o igual a 50000', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 60000;
    carrito.aplicarCupon('SABANERO10');
    expect(carrito.descuentoCupon).toBe(6000);
  });

  test('CA2: Cupon SABANERO10 no aplica descuento si el subtotal es menor a 50000', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 40000;
    carrito.aplicarCupon('SABANERO10');
    expect(carrito.descuentoCupon).toBe(0);
  });

  test('CA3: Un cupon invalido no genera ningun descuento', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 60000;
    carrito.aplicarCupon('CUPON_INVALIDO');
    expect(carrito.descuentoCupon).toBe(0);
  });
});