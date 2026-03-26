import 'package:flutter/material.dart';

class CustomTextFormField extends StatelessWidget {
  final String? label;
  final String? hint;
  final bool obscureText;
  final String? errorMessage;
  final Function(String)? onChanged;
  final String? Function(String?)? validator;

  const CustomTextFormField({
    super.key, 
    this.errorMessage,
    this.obscureText = false,
    this.label, 
    this.hint, 
    this.onChanged, 
    this.validator
  });

  @override
  Widget build(BuildContext context) {

    final colors = Theme.of(context).colorScheme;

    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(20)
    );

    return TextFormField(
      onChanged: this.onChanged,

      validator: this.validator,

      obscureText: this.obscureText,

      decoration: InputDecoration(
        enabledBorder: border,
        focusedBorder: border.copyWith(borderSide: BorderSide(color: colors.primary)),
        errorBorder: border.copyWith(borderSide: BorderSide(color: Colors.red.shade800)),
        focusedErrorBorder: border.copyWith(borderSide: BorderSide(color: Colors.red.shade800)),

        label: this.label != null ? Text(this.label!) : null,
        hintText: this.hint,

        focusColor: colors.primary,
        // prefixIcon: Icon(Icons.supervised_user_circle_outlined, color: colors.primary),

        errorText: this.errorMessage,
        isDense: true
      ),

    );
  }
}