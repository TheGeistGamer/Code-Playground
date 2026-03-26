void main() {
  Audio volumen = Audio.alto; // 0 = bajo, 1 = medio, 2 = alto

  switch (volumen) {
    case Audio.bajo:
      print('Volumen bajo');
      break;
    case Audio.medio:
      print('Volumen medio');
      break;
    case Audio.alto:
      print('Volumen alto');
      break;
    default:
      print('Volumen no válido');
  }
}

enum Audio { bajo, medio, alto }
