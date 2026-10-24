import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-06: Acumular puntos de fidelidad', () => {
  test('CA1: Otorga 1 punto por cada 1000 del subtotal', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 50000;

    carrito.calcularPuntos();

    expect(carrito.puntosGanados).toBe(50);
  });

  test('CA2: Subtotal menor a 1000 no otorga puntos', () => {
    const carrito = new CarritoCompras();
    carrito.subtotal = 500;

    carrito.calcularPuntos();

    expect(carrito.puntosGanados).toBe(0);
  });
});