class MiServicio {
  String url = 'https://api.nada.com';
  String key = 'ABC';

  static final MiServicio _singleton = new MiServicio._internal();

  factory MiServicio() {
    return _singleton;
  }

  MiServicio._internal() {}
}
