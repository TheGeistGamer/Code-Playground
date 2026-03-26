import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class CustomBottonNavigation extends StatelessWidget {
  const CustomBottonNavigation({super.key});

  int getCurrentIndex(BuildContext context) {
    final String? location = GoRouterState.of(context).fullPath;

    switch(location) {
      case '/': return 0;
      case '/categories': return 1;
      case '/favorites': return 2;

      default: return 0;
    }
  }

  void onItemTapped(BuildContext context, int index) {
    switch(index) {
      case 0: return context.go('/');
      case 1: return context.go('/');
      case 2: return context.go('/favorites');
    }
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      elevation: 0, 
      currentIndex: getCurrentIndex(context),
      onTap: (index) => onItemTapped(context, index),

      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home_outlined),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.movie_outlined),
          label: 'Movies',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person_outline),
          label: 'Profile',
        ),
    ]);
  }
}
