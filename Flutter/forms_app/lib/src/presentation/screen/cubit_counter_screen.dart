import 'package:forms_app/src/presentation/blocs/counter_cubit/counter_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';

class CubitCounterScreen extends StatelessWidget {
  const CubitCounterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (context) => CounterCubit(), child: const _CubitCounterView());
  }
}

class _CubitCounterView extends StatelessWidget {
  const _CubitCounterView();

  @override
  Widget build(BuildContext context) {

    // final counterState = context.watch<CounterCubit>().state;
    final incressState = context.watch<CounterCubit>().increaseBy;
    final resetState = context.watch<CounterCubit>().reset;

    return Scaffold(
        appBar: AppBar(
          // title: Text('Cubit counter: ${counterState.transactionCount}'),
          actions: [
            IconButton(
                icon: const Icon(Icons.refresh_outlined), 
                onPressed: () => resetState()
              )
          ],
        ),

        body: Center(child: BlocBuilder<CounterCubit, CounterState>(
          buildWhen: (previous, current) => previous.counter != current.counter,
          builder: (context, state) {
            return Text('Counter value: ${state.counter}');
          },
        )),

        floatingActionButton: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton(
                heroTag: '1', child: const Text('+3'), onPressed: () => incressState(3)),
            const SizedBox(height: 20),
            FloatingActionButton(
                heroTag: '2', child: const Text('+2'), onPressed: () => incressState(2)),
            const SizedBox(height: 20),
            FloatingActionButton(
                heroTag: '3', child: const Text('+1'), onPressed: () => incressState(1))
          ],
        ));
  }
}
