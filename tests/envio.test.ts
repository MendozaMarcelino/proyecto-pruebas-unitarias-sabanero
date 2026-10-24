import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-05: Calcular el envío', () => {
  test('CA1: Cobrar $8.000 para Sincelejo y $15.000 para otros municipios', () => {
    const carrito1 = new CarritoCompras();
    carrito1.agregarProducto({ id: 'P01', nombre: 'Sal', precio: 5000, tarifaIva: 0, stock: 10 }, 1);
    expect(carrito1.calcularCostoEnvio('Sincelejo')).toBe(8000);

    const carrito2 = new CarritoCompras();
    carrito2.agregarProducto({ id: 'P01', nombre: 'Sal', precio: 5000, tarifaIva: 0, stock: 10 }, 1);
    expect(carrito2.calcularCostoEnvio('Corozal')).toBe(15000);
  });

  test('CA2: Envío gratis si los productos con IVA suman $150.000 o más', () => {
    const carrito = new CarritoCompras();
    carrito.agregarProducto({ id: 'P01', nombre: 'Licuadora', precio: 180000, tarifaIva: 0.19, stock: 10 }, 1);

    expect(carrito.calcularCostoEnvio('Sincelejo')).toBe(0);
  });
});