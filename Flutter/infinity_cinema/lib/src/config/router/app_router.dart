import 'package:infinity_cinema/src/presentation/views/views.dart';
import 'package:infinity_cinema/src/screens/index.dart';
import 'package:go_router/go_router.dart';

final appRouter = GoRouter(
  initialLocation: '/', 
  routes: [

    ShellRoute(
      builder: (context, state, child) => HomeScreen(childView: child),

      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) {
            return const HomeView();
          },

          routes: [
            GoRoute(
              path: 'movie/:id',
              name: MovieScreen.name,
              builder: (context, state) {
                final movieId = state.pathParameters['id'];
                return MovieScreen(movieId: movieId ?? 'no_id');
              },
            )
          ]
        ),

        GoRoute(
          path: '/favorites',
          builder: (context, state) {
            return const FavoritesView();
          }
        ),
      ]
    ),

    // GoRoute(
    //     path: '/',
    //     name: HomeScreen.name,
    //     builder: (context, state) => const HomeScreen(childView: HomeView()),
    //     routes: [
    //       GoRoute(
    //           path: 'movie/:id',
    //           name: MovieScreen.name,
    //           builder: (context, state) {
    //             final movieId = state.pathParameters['id'];
    //             return MovieScreen(movieId: movieId ?? 'no_id');
    //           }),
    //     ]),
]);
