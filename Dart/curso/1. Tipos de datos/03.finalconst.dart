void main() {
  var a = 10;
  // -- "final" es mas ligera --
  final double b = 10;

  // -- "const" no tiene metodos y son valores que no cambian --
  const c = 10;

  // Las variables si se puden mutar
  a = 20;

  final personalInfo = ['Juan', 'Pedro', 'Fernando'];
  const personalInfoConst = ['Juan', 'Pedro', 'Fernando'];

  personalInfo.add('Maria');

  // print(personalInfo);

  // -- "late" nos permite declarar una variable despues --
  late final double x;
  x = 10;

  print(x);
}
