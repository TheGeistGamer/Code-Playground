import 'package:flutter/material.dart';

const Color _customColor = Color(0xFF5c11d4);

const List<Color> _colorTheme = [
  _customColor,
  Colors.pink,
  Colors.green,
  Colors.orange,
  Colors.lightBlueAccent,
  Colors.deepPurpleAccent,
];

class AppTheme {
  final int selectedColor;

  AppTheme({this.selectedColor = 0})
      : assert(selectedColor >= 0 && selectedColor < _colorTheme.length,
            'Colors must be between 0 and ${_colorTheme.length - 1}');

  ThemeData customTheme() {
    return ThemeData(
      useMaterial3: true,
      colorSchemeSeed: _colorTheme[selectedColor],
    );
  }
}
