import 'package:formz/formz.dart';

// Define input validation errors
enum UsernameError { empty, lenght }

// Extend FormzInput and provide the input type and error type
class Username extends FormzInput<String, UsernameError> {

  // Call super.pure to represent an unmodified form input
  const Username.pure() : super.pure('');

  // Call super.dirty to represent a modified form input
  const Username.dirty(super.value) : super.dirty();
  
  String? get errorMessage {
    if (this.isValid || isPure) return null;
    if (this.displayError == UsernameError.empty) return 'El nombre de usuario es requerido';
    if (this.displayError == UsernameError.lenght) return 'El nombre de usuario debe tener al menos 3 caracteres';

    return null;
  }

  // Override validator to handle validating a given input value
  @override
  UsernameError? validator(String value) {
    if (value.isEmpty || value.trim().isEmpty) return UsernameError.empty;
    if (value.length < 3) return UsernameError.lenght;

    return null;
  }
}