class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  void imprimirNombre() => print('Nombre: $nombre y mi edad es: $edad');
}

class Cliente extends Persona {
  String? direccion;
  List ordenes = [];

  Cliente(String nombreActual, int edadActual)
      : super(nombreActual, edadActual);
}

main() {
  final yo = new Cliente('Frank', 30);

  yo.imprimirNombre();
}
