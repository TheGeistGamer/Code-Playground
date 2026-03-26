class Persona {
  // Campos o propiedades
  String nombre;
  int edad;
  String _bio = 'Hola, soy una propiedad privada';

  Persona({this.nombre = 'Pedro', this.edad = 20});

  // Esto es un contructor con nombres
  Persona.persona30(this.nombre, {this.edad = 30});

  // get /y Sets
  String get info {
    return this._bio;
  }

  set bio(String bio) {
    this._bio = bio;
  }

  // metodos
  @override
  toString() => '$nombre $edad $_bio';
}
