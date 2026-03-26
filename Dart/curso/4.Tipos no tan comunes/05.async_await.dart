import 'dart:io';

main() async {
  String path = Directory.current.path + '/assets/personas.txt';
  String txt = await leerArchivo(path);
  print(txt);

  print('Fin del main');
}

Future<String> leerArchivo(String path) async {
  File file = new File(path);
  return await file.readAsString();
}
