import 'package:provider/provider.dart';
import 'package:yes_or_not/src/controllers/entities/message.entitie.dart';
import 'package:yes_or_not/src/providers/chat.provider.dart';
import 'package:yes_or_not/src/screens/widgets/chat/message_bubble.dart';
import 'package:flutter/material.dart';
import 'package:yes_or_not/src/screens/widgets/chat/recept_message_bubble.dart';
import 'package:yes_or_not/src/screens/widgets/shared/message.filed.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const Padding(
          padding: EdgeInsets.all(4.0),
          child: CircleAvatar(
            backgroundImage: NetworkImage(
                'https://i.pinimg.com/originals/c9/93/8f/c9938fe8516d779cb967474bd11969d5.jpg'),
          ),
        ),
        title: const Text('Amigo'),
        centerTitle: false,
      ),
      body: _ChatView(),
    );
  }
}

class _ChatView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final chatProvider = context.watch<ChatProvider>();

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 8.0),
        child: Column(children: [
          Expanded(
              child: ListView.builder(
                  controller: chatProvider.chatScrollController,
                  itemCount: chatProvider.messagesList.length,
                  itemBuilder: (context, index) {
                    final message = chatProvider.messagesList[index];

                    return (message.fromWho == FromWho.other)
                        ? ReceptMessageBubble(message: message)
                        : MessageBubble(message: message);
                  })),
          // -- Input de mensajes --
          const SizedBox(height: 15),

          MessageFieldBox(onValue: chatProvider.sendMessage)
        ]),
      ),
    );
  }
}
