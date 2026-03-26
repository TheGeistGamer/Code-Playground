import 'package:dio/dio.dart';
import 'package:yes_or_not/src/controllers/entities/message.entitie.dart';
import 'package:yes_or_not/src/models/answers.model.dart';

class GetAnswers {
  final _dio = Dio();

  Future<Message> getAnswers() async {
    final response = await _dio.get('https://yesno.wtf/api');

    final yesNotModel = AnswersModel.fromJsonMap(response.data);

    return yesNotModel.toMessageEntity();
  }
}
