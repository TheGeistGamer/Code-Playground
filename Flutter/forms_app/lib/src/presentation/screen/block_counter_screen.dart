import 'package:forms_app/src/presentation/blocs/counter_bloc/counter_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';

class BlockCounterScreen extends StatelessWidget {
  const BlockCounterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CounterBloc(),
      child: const _BlocCounterView(),
    );
  }
}

class _BlocCounterView extends StatelessWidget {
  const _BlocCounterView();

  void increaseCounter(BuildContext context, [int value = 1]) {
    context.read<CounterBloc>().add(CounterIncreased(value));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: context.select((CounterBloc bloc) => Text('Counter value: ${bloc.state.transactionCount}')),
          actions: [
            IconButton(
                icon: const Icon(Icons.refresh_outlined), 
                onPressed: () => context.read<CounterBloc>().add(const CounterReset())
              )
          ],
        ),
        body: Center(
          child: context.select((CounterBloc bloc) => Text('Counter value: ${bloc.state.counter}')),
        ),


        floatingActionButton: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton(
                heroTag: '1', child: const Text('+3'), onPressed: () => this.increaseCounter(context, 3)),
            const SizedBox(height: 20),
            FloatingActionButton(
                heroTag: '2', child: const Text('+2'), onPressed: () => this.increaseCounter(context, 2)),
            const SizedBox(height: 20),
            FloatingActionButton(
                heroTag: '3', child: const Text('+1'), onPressed: () => this.increaseCounter(context))
          ],
        ));
  }
}
