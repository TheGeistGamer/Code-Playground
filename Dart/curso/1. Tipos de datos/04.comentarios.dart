void main() {
  // Esta es una variable temporal que quiere decir que es un numero entero
  int a = 10; // Esto deberia ser un 10

  final personal = [
    'Juan',
    'Pedro',
    'Fernando',
  ];

  // Comentario en bloque
  /*

  final personal = [
    'Juan',
    'Pedro',
    'Fernando',
  ];

    ** Esto es un comentario en multi linea
  */
}

saludar(String nombre, int edad) {
  // Saludar a la persona
  print('Hola $nombre, tienes $edad años');
}
