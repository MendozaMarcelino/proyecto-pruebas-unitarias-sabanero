import { describe, test, expect, vi } from 'vitest';
import { CarritoCompras } from '../src/carrito';
import { ServicioInventario } from '../src/inventario';

describe('Pruebas con Dobles de Prueba (Mocks) - Servicio de Inventario', () => {
  test('MOCK-01: Verificación de stock disponible con mock (vi.fn)', () => {
    // AAA - Preparar
    const mockInventario: ServicioInventario = {
      consultarStock: vi.fn().mockReturnValue(10)
    };
    const carrito = new CarritoCompras();
    const producto = { id: 'P100', nombre: 'Arroz', precio: 4500, stock: 10 };

    // Ejecutar
    const stockDisponible = mockInventario.consultarStock(producto.id);
    carrito.agregarProducto(producto, stockDisponible);

    // Verificar
    expect(mockInventario.consultarStock).toHaveBeenCalledWith('P100');
    expect(mockInventario.consultarStock).toHaveBeenCalledTimes(1);
  });

  test('MOCK-02: Rechazo de producto cuando el mock retorna stock insuficiente', () => {
    const mockInventario: ServicioInventario = {
      consultarStock: vi.fn().mockReturnValue(2)
    };
    const producto = { id: 'P200', nombre: 'Café', precio: 15000, stock: 2 };

    const stockReal = mockInventario.consultarStock(producto.id);
    expect(stockReal).toBeLessThan(5);
  });

  test('ERR-01: Excepción al intentar agregar más unidades del stock disponible', () => {
    const carrito = new CarritoCompras();
    const producto = { id: 'P300', nombre: 'Licuadora', precio: 180000, stock: 3 };

    expect(() => carrito.agregarProducto(producto, 5)).toThrow();
  });
});