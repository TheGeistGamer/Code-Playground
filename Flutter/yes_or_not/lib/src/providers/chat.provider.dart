import 'package:flutter/material.dart';
import 'package:yes_or_not/src/config/helpers/get_answers.dart';
import 'package:yes_or_not/src/controllers/entities/message.entitie.dart';

class ChatProvider extends ChangeNotifier {
  final chatScrollController = ScrollController();
  final getAnswers = GetAnswers();

  List<Message> messagesList = [];

  Future<void> sendMessage(String text) async {
    if (text.isEmpty) return;

    final newMessage = Message(text: text, fromWho: FromWho.me);
    messagesList.add(newMessage);

    if (text.endsWith('?')) {
      herReplay();
    }

    // Notifica a todos los providers para que se actualicen
    notifyListeners();
    moveScrollToBottom();
  }

  Future<void> herReplay() async {
    final herMessage = await getAnswers.getAnswers();
    messagesList.add(herMessage);

    notifyListeners();
    moveScrollToBottom();
  }

  void moveScrollToBottom() {
    chatScrollController.animateTo(
        chatScrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut);
  }
}
