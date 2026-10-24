import { describe, it, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-01: Agregar productos al carrito', () => {
  it('CA1: Debería agregar un producto al carrito cuando la cantidad está entre 1 y 50 y hay stock', () => {
    // Arrange (Preparar)
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Arroz', stock: 100, precio: 4500 };

    // Act (Ejecutar)
    carrito.agregarProducto(producto, 5);

    // Assert (Verificar)
    expect(carrito.obtenerItems()).toHaveLength(1);
    expect(carrito.obtenerItems()[0].cantidad).toBe(5);
  });
});