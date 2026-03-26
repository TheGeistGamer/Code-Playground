import 'dart:io';

main() {
  String path = Directory.current.path + '/assets/personas.txt';
  File file = new File(path);

  Future<String> f = file.readAsString();
  f.then((value) => print(value));

  print('Fin del main');
}
