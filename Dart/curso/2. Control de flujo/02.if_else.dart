import 'dart:io';

main() {
  stdout.writeln('¿Cuál es tu edad? ');
  int edad = int.parse(stdin.readLineSync() ?? '0');

  // if (edad >= 18) {
  //   stdout.writeln('Eres mayor de edad');
  // } else {
  //   stdout.writeln('Eres menor de edad');
  // }

  if (21 <= edad) {
    stdout.writeln('Ciudadano');
  } else if (18 <= edad && edad <= 20) {
    stdout.writeln('Mayor de edad');
  } else {
    stdout.writeln('Eres menor de edad');
  }
}
