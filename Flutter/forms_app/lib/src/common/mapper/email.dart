import 'package:formz/formz.dart';

// Define input validation errors
enum EmailError { empty, format }

// Extend FormzInput and provide the input type and error type
class Email extends FormzInput<String, EmailError> {
  static final RegExp _emailRegExp = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

  // Call super.pure to represent an unmodified form input
  const Email.pure() : super.pure('');

  // Call super.dirty to represent a modified form input
  const Email.dirty(super.value) : super.dirty();

  String? get errorMessage {
    if (this.isValid || isPure) return null;
    if (this.displayError == EmailError.empty) return 'El email es requerido';
    if (this.displayError == EmailError.format) return 'El email no es válido';

    return null;
  }

  // Override validator to handle validating a given input value
  @override
  EmailError? validator(String value) {
    if (value.isEmpty || value.trim().isEmpty) return EmailError.empty;
    if (!_emailRegExp.hasMatch(value)) return EmailError.format;

    return null;
  }
}

// if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) return 'El email no es válido';