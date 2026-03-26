import 'package:yes_or_not/src/controllers/entities/message.entitie.dart';

class AnswersModel {
  final String answer;
  final bool forced;
  final String image;

  AnswersModel({
    required this.answer,
    required this.forced,
    required this.image,
  });

  factory AnswersModel.fromJsonMap(Map<String, dynamic> json) => AnswersModel(
        answer: json["answer"],
        forced: json["forced"],
        image: json["image"],
      );

  Map<String, dynamic> toJson() => {
        "answer": answer,
        "forced": forced,
        "image": image,
      };

  Message toMessageEntity() => Message(
      text: answer == 'yes' ? 'Si' : 'No',
      fromWho: FromWho.other,
      imageUrl: image);
}
