import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('Prueba de Integración Obligatoria (Ejemplo Guía Evaluativa)', () => {
  test('INTEGRACION-01: Liquidación completa de compra según el ejemplo del caso Mercado Sabanero', () => {
    const carrito = new CarritoCompras();

    // 1 Licuadora $180.000 (19% IVA), 2 Cafés $15.000 (5% IVA), 4 Arroces $4.500 (0% IVA)
    carrito.agregarProducto({ id: 'P1', nombre: 'Licuadora', precio: 180000, tarifaIva: 0.19, stock: 10 }, 1);
    carrito.agregarProducto({ id: 'P2', nombre: 'Café', precio: 15000, tarifaIva: 0.05, stock: 10 }, 2);
    carrito.agregarProducto({ id: 'P3', nombre: 'Arroz', precio: 4500, tarifaIva: 0.00, stock: 10 }, 4);

    // Verificaciones según valores exactos del enunciado:
    expect(carrito.calcularSubtotal()).toBe(228000);
    expect(carrito.calcularDescuentoVolumen()).toBe(11400);
    expect(carrito.calcularIvaTotal()).toBe(33915);
    expect(carrito.calcularCostoEnvio('Sincelejo')).toBe(0);
    expect(carrito.calcularTotalPagar('Sincelejo')).toBe(250515);
    expect(carrito.calcularPuntosFidelidad('ESTANDAR')).toBe(250);
  });
});