// -- Los mixin --
// Es una forma de heredar metodos y propiedades de una clase a otra clase

mixin Logger {
  void imprimir(String texto) {
    final hoy = DateTime.now();
    print('$hoy :::: $texto');
  }
}

abstract class Astro with Logger {
  String nombre;

  Astro(this.nombre) {
    imprimir('-- Init del Astro --');
  }

  void existo() {
    imprimir('-- Soy un ser celestial y existo --');
  }
}

class Asteroide extends Astro {
  Asteroide(String nombre) : super(nombre);
}

main() {
  final asteroide = new Asteroide('Frank');
  asteroide.imprimir('Hola');
}
