import 'dart:io';

main() {
  // for (int i = 0; i < 10; i++) {
  //   print(i);
  // }
  stdout.writeln('Elige una base: ');
  int base = int.parse(stdin.readLineSync() ?? '1');

  for (int i = 1; i <= 10; i++) {
    stdout.writeln('${base} * $i = ${base * i}');
  }
}
