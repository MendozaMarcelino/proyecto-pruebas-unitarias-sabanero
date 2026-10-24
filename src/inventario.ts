export interface ServicioInventario {
  consultarStock(productoId: string): number;
}