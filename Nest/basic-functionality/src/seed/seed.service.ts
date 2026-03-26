import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { Brands_SEED } from './data/brands.seed';
import { Cars_SEED } from './data/cars.seed';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsServices: CarsService,
    private readonly brandsServices: BrandsService
  ) {}

  populateDB() {
    this.carsServices.fillCarsWithSeed(Cars_SEED)
    this.brandsServices.fillBrandsWithSeed(Brands_SEED)

    return 'DB populated'
  }
}
