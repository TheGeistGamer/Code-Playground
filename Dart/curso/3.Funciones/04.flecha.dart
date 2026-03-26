main() {
  int a = 10, b = 20;
  int resultado = sumar(a, b);

  List<int> listado = [
    1,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    5,
    5,
    5,
    6,
    3,
    2,
    9,
    1,
    10,
    3,
    8,
    9,
    10
  ];

  var nuevoListado = listado.where((num) => num > 5).toSet();
  print(nuevoListado);

  // print(resultado);
}

int sumar(int x, int y) {
  return x + y;
}

int sumarFlecha(int x, int y) => x + y;
