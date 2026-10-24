import { describe, it, expect } from 'vitest';
import { CarritoCompras, Producto } from '../src/carrito';

describe('HU-02: Cálculo del IVA según la categoría del producto', () => {
  it('CA1: Debería calcular correctamente el IVA del 19% para productos generales', () => {
    const carrito = new CarritoCompras();
    const producto: Producto = { id: 'P01', nombre: 'Electrodoméstico', stock: 10, precio: 100000 };
    
    carrito.agregarProducto(producto, 1);
    
    expect(carrito.calcularIVA(0.19)).toBe(19000);
  });

  it('CA2: Debería aplicar tarifa 0% para productos exentos o de canasta familiar básica', () => {
    const carrito = new CarritoCompras();
    const producto: Producto = { id: 'P02', nombre: 'Arroz', stock: 50, precio: 5000 };
    
    carrito.agregarProducto(producto, 2);
    
    expect(carrito.calcularIVA(0)).toBe(0);
  });
});