import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-04: Usar cupones', () => {
  test('CA1: Aplicar cupon SABANERO10 otorga 10% de descuento con subtotal mayor o igual a 50000', () => {
    // Arrange
    const carrito = new CarritoCompras();
    carrito.subtotal = 60000;

    // Act
    carrito.aplicarCupon('SABANERO10');

    // Assert
    expect(carrito.descuentoCupon).toBe(6000); // 10% de 60.000 es 6000
  });
});