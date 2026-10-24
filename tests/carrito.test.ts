import { describe, test, expect } from 'vitest';
import { CarritoCompras } from '../src/carrito';

describe('HU-01: Agregar productos al carrito y validaciones de cobertura', () => {
  test.each([
    [1],
    [25],
    [50]
  ])('CA1: Cantidad válida %i unidades agregadas correctamente', (cantidad) => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Harina', precio: 3000, stock: 100 };
    
    carrito.agregarProducto(producto, cantidad);
    expect(carrito.obtenerItems().length).toBe(1);
  });

  test.each([
    [0],
    [-1],
    [51],
    [100]
  ])('ERR-02: CA2 Rechaza cantidad inválida de %i unidades con excepción', (cantidad) => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Harina', precio: 3000, stock: 100 };

    expect(() => carrito.agregarProducto(producto, cantidad)).toThrow();
  });

  test('CA4: Suma cantidades si el producto ya existe en el carrito', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Aceite', precio: 12000, stock: 50 };

    carrito.agregarProducto(producto, 2);
    carrito.agregarProducto(producto, 3);

    expect(carrito.obtenerItems()[0].cantidad).toBe(5);
  });

  test('ERR: Lanza excepción cuando la cantidad acumulada de un producto existente supera el stock', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P01', nombre: 'Aceite', precio: 12000, stock: 5 };

    carrito.agregarProducto(producto, 3);
    expect(() => carrito.agregarProducto(producto, 3)).toThrow('Stock insuficiente para la cantidad acumulada');
  });

  test('COBERTURA: Retorna 0 en cálculo de IVA cuando el carrito está vacío', () => {
    const carrito = new CarritoCompras();
    expect(carrito.calcularIvaTotal()).toBe(0);
  });
});