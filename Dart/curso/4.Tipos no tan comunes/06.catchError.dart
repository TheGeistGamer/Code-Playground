main() {
  Future<String> timeout = Future.delayed(Duration(seconds: 3), () {
    if (1 == 1) {
      throw 'Auxilio!, explotó esta cosa';
    }
    return 'Retorno del future';
  });

  timeout.then((value) => print(value)).catchError((error) => print(error));

  print('Fin del main');
}
