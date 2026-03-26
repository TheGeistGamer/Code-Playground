import 'class/Personas.dart';

main() {
  final persona = new Persona(nombre: 'Pedro', edad: 30);

  final persona2 = new Persona.persona30('Maria');

  print(persona2.toString());
}
