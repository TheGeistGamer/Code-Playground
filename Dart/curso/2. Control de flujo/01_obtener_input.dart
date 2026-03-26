import 'dart:io'; // Importar librería 'io

void main() {
  // Imprimir en la terminal
  stdout.write('¿Cuál es tu edad? ');

  // Leer la informacion
  String edad = stdin.readLineSync() ?? 'No hay datos';

  // Imprimir en la terminal
  stdout.writeln('Tu edad es: $edad');
}
