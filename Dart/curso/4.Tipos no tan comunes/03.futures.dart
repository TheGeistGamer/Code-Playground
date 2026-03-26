main() {
  Future timeout = Future.delayed(Duration(seconds: 3), () {
    print('3 segundos después');
    return 'Retorno del future';
  });

  timeout.then((value) => print(value));

  print('Fin del programa');
}
