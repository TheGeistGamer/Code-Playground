import 'package:forms_app/src/presentation/blocs/register/register_cubit.dart';
import 'package:forms_app/src/presentation/widgets/index.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Register')),
      body: BlocProvider(
        create: (context) => RegisterCubit(),
        child: const _RegisterView(),
      ),
    );
  }
}

class _RegisterView extends StatelessWidget {
  const _RegisterView();

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              // - logo -
              FlutterLogo(size: 100),

              // - formulario -
              _RegisterForm(),

              // - separacion -
              SizedBox(height: 10)
            ],
          ),
        ),
      ),
    );
  }
}

class _RegisterForm extends StatelessWidget {
  const _RegisterForm();

  @override
  Widget build(BuildContext context) {
    final registerCubit = context.watch<RegisterCubit>();
    final username = registerCubit.state.username;
    final password = registerCubit.state.password;
    final email = registerCubit.state.email;

    return Form(
        child: Column(
          children: [
            const SizedBox(height: 10),

            // -- usuario --
            CustomTextFormField(
              label: 'Nombre de usuario',
              onChanged: registerCubit.usernameChanged,
              errorMessage: username.errorMessage
            ),

            const SizedBox(height: 20),

            // -- Email --
            CustomTextFormField(
              label: 'Email',
              onChanged: (value) => registerCubit.emailChanged(value),
              errorMessage: email.errorMessage,
            ),

            const SizedBox(height: 20),

            // -- Password --
            CustomTextFormField(
              label: 'Password',
              obscureText: true,
              onChanged: registerCubit.passwordChanged,
              errorMessage: password.errorMessage
            ),

            const SizedBox(height: 20),

            // -- button --
            FilledButton.tonalIcon(
              onPressed: () {
                // - decir que valide el formulario y si hay errores los manda a los inputs -
                // final isValid = _formKey.currentState!.validate();
                // if (!isValid) return;

                // - decir que se envie el formulario -
                registerCubit.onSubmit();
              },
              icon: const Icon(Icons.save),
              label: const Text('Register'),
            ),
          ],
        ));
  }
}
