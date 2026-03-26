class Location {
  final double lat;
  final double lng;

  const Location(this.lat, this.lng);
}

main() {
  final sanFrancisco = new Location(18.2323, 23.2323);
  final sanFrancisco1 = new Location(18.2323, 23.2323);
  final sanFrancisco2 = new Location(18.2323, 23.2323);

  // print(sanFrancisco == sanFrancisco1); // false
  // print(sanFrancisco == sanFrancisco2); // false

  const sanFrancisco3 = const Location(18.2323, 23.2323);
  const sanFrancisco4 = const Location(18.2323, 23.2323);
  const sanFrancisco5 = const Location(18.2323, 23.2323);

  print(sanFrancisco3 == sanFrancisco4); // true
  print(sanFrancisco4 == sanFrancisco5); // true
}
