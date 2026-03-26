main() {
  // -- Numeros --
  int a = 10;
  double b = 5.5;

  int _c = 30;
  double $b = 40;

  // print(_c + $b - b + a);

  // -- Strings --
  String nombre = 'Tony de $a años';
  String multilinea = '''
  Esto es un texto de muchasl lineas de $_c
''';

  // print(nombre);
  // print(multilinea);

  // -- Booleanos --
  bool isActive = false;
  bool isNotActive = !isActive;

  // print(isActive);
  // print(isNotActive);

  // -- Listas --
  List<String> villanos = ['Lex', 'Red Skull', 'Doom'];
  villanos[0] = 'Superman';

  villanos.add('Duende Verde');

  print(villanos);

  // - Pasar a una lista de Set --
  var villanosSet = villanos.toSet();
  print(villanosSet.toList());

  // -- Sets --
  // - Solo permite un valor unico -
  var villanos2 = {'Lex', 'Red Skull', 'Doom'};
  Set<String> heroes = {'Superman'};

  heroes.add('Batman');

  print(heroes);

  // -- Maps --
  Map<String, Object> ironman = {
    'nombre': 'Tony Stark',
    'edad': 40,
    'poder': 'Inteligencia'
  };

  print(ironman['nombre']);

  Map<String, Object> capitan = new Map();
  capitan.addAll({'nombre': 'Steve', 'edad': 40, 'poder': 'Soportar suero'});
}
