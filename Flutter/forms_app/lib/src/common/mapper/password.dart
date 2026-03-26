import 'package:formz/formz.dart';

// Define input validation errors
enum PasswordError { empty, lenght }

// Extend FormzInput and provide the input type and error type
class Password extends FormzInput<String, PasswordError> {

  // Call super.pure to represent an unmodified form input
  const Password.pure() : super.pure('');

  // Call super.dirty to represent a modified form input
  const Password.dirty(super.value) : super.dirty();

  String? get errorMessage {
    if (this.isValid || isPure) return null;
    if (this.displayError == PasswordError.empty) return 'La contraseña es requerida';
    if (this.displayError == PasswordError.lenght) return 'La contraseña debe tener al menos 8 caracteres';

    return null;
  }

  // Override validator to handle validating a given input value
  @override
  PasswordError? validator(String value) {
    if (value.isEmpty || value.trim().isEmpty) return PasswordError.empty;
    if (value.length < 8) return PasswordError.lenght;

    return null;
  }
}