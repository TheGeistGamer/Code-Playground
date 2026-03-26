import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PropCar } from './interface/cars.interface';
import { CreateCarDto, UpdateCarDto } from './dtos';


@Injectable()
export class CarsService {
  private cars: PropCar[] = [
    // {
    //   id: crypto.randomUUID(),
    //   brand: 'Toyoya',
    //   model: 'Corolla',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const carSelect = this.cars.find((car) => car.id === id);
    if (!carSelect) throw new NotFoundException('Car not found');

    return carSelect;
  }

  create (createCardDto: CreateCarDto) {
    const newCar: PropCar = {
      id: crypto.randomUUID(),
      ...createCardDto
    }

    this.cars.push(newCar)

    return newCar
  }

  update (id: string, updateCardDto: UpdateCarDto) {
    const cardDB = this.findOneById(id);

    if (updateCardDto.id && updateCardDto.id !== cardDB.id) throw new BadRequestException('Cannot update id')

    this.cars = this.cars.map((car) => {
      if (car.id === cardDB.id) {
        return {
          ...car,
          ...updateCardDto,
          id
        }
      }

      return car;
    })

    return this.cars
  }

  delete (id: string) {
    const carDB = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== carDB.id)
    return carDB
  }

  fillCarsWithSeed(cars: PropCar[]) {
    this.cars = cars;
  }
}
