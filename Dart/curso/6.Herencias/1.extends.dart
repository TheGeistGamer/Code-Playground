class Vehiculo {
  bool encendido = false;

  void encender() {
    encendido = true;
    print('Vehiculo encendido');
  }

  void apagar() {
    encendido = false;
    print('Vehiculo apagado');
  }
}

class Carro extends Vehiculo {
  int kilometraje = 0;

  void conducir() {
    if (encendido) {
      kilometraje++;
      print('Kilometraje: $kilometraje');
    } else {
      print('El vehiculo esta apagado');
    }
  }
}

// "abstract" es una palabra clave que se utiliza para definir una clase abstracta.
// Una clase abstracta es una clase que no se puede instanciar, pero se puede utilizar
//  para definir subclases o extensiones.

void main() {
  final ford = new Carro();

  ford.encender();
  ford.conducir();
  ford.conducir();
  ford.conducir();
  ford.conducir();
  ford.apagar();
}
