import 'dart:async';

void main() {
  StreamController<String> streamCtr = StreamController<String>.broadcast();

  streamCtr.stream.listen((data) => print('Despegando! $data'),
      onDone: () => print('Fin de la misión'),
      onError: (err) => print('Error! $err'),
      cancelOnError: true);

  streamCtr.stream.listen((data) => print('Despegando! $data'),
      onDone: () => print('Fin de la misión'),
      onError: (err) => print('Error! $err'),
      cancelOnError: true);

  streamCtr.sink.add('Apollo 11');
  streamCtr.sink.add('Apollo 12');
  streamCtr.sink.add('Apollo 13');
  // streamCtr.sink.addError('Houston, tenemos un problema');
  streamCtr.sink.add('Apollo 14');
  streamCtr.sink.add('Apollo 15');

  streamCtr.sink.close();

  print('Fin del programa');
}
