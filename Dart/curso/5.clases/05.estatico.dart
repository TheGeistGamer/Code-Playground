class Herramientas {
  static const List<String> listado = [
    'Martillo',
    'Llave Inglesa',
    'Desarmador'
  ];

  static void imprimirListado() => listado.forEach(print);
}

void main() {
  // Si es declarado como "const" no se puede modificar
  // Herramientas.listado.add('Tenazas');

  // Herramientas.listado.forEach(print);
  Herramientas.imprimirListado();
}
