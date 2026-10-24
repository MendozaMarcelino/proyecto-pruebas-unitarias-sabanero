import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-05: Calcular costo de envío', () => {
  test('CA1: Envío gratis si el subtotal es mayor o igual a 100000', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 120000;

    carrito.calcularEnvio();

    expect(carrito.costoEnvio).toBe(0);
  });

  test('CA2: Costo de envío estándar (10000) si el subtotal es menor a 100000', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 50000;

    carrito.calcularEnvio();

    expect(carrito.costoEnvio).toBe(10000);
  });
});