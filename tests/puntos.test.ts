import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-06: Acumular puntos de fidelidad', () => {
  test('CA1: Otorga 1 punto por cada $1.000 completos para cliente ESTANDAR', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Arroz', precio: 10000, tarifaIva: 0, stock: 10 }, 1);

    expect(carrito.calcularPuntosFidelidad('ESTANDAR')).toBe(10);
  });

  test('CA2: Otorga el doble de puntos para cliente ORO', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Arroz', precio: 10000, tarifaIva: 0, stock: 10 }, 1);

    expect(carrito.calcularPuntosFidelidad('ORO')).toBe(20);
  });
});