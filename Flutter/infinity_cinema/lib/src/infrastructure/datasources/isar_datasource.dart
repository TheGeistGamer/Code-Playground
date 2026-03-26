import 'package:infinity_cinema/src/dominio/datasources/local_storage_datasource.dart';
import 'package:infinity_cinema/src/dominio/entities/movie.dart';
import 'package:isar/isar.dart';

class IsarDatasource extends LocalStorageDatasource {

  late Future<Isar> db;

  IsarDatasource() {
    db = openDB();
  }

  Future<Isar> openDB() async {
    if (Isar.instanceNames.isEmpty) {
      return await Isar.open([MovieSchema], inspector: true, directory: './isar');
    }

    return Future.value(Isar.getInstance());
  }


  @override
  Future<bool> isMovieFavorite(int movieId) async {
    final isar = await db;
    
    final movie = await isar.movies
      .filter()
      .idEqualTo(movieId)
      .findFirst();

    return movie != null;
  }

  @override
  Future<List<Movie>> loadMovies({int limit = 10, offset = 0}) async{
    final isar = await db;
    
    return await isar.movies.where()
      .offset(offset)
      .limit(limit)
      .findAll();
  }

  @override
  Future<void> toggleFavorite(Movie movie) async{
    final isar = await db;

    final favoriteMovie = await isar.movies
      .filter()
      .idEqualTo(movie.id)
      .findFirst();
    
    if (favoriteMovie != null) {
      // Remove from favorites
      return isar.writeTxnSync(() => isar.movies.deleteSync(favoriteMovie.isardId));
    }

    isar.writeTxnSync(() => isar.movies.putSync(movie));
  }

}