import { PropCar } from 'src/cars/interface/cars.interface';

export const Cars_SEED: PropCar[] = [
  {
    id: crypto.randomUUID(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: crypto.randomUUID(),
    brand: 'Chevrolet',
    model: 'Spark',
  },
  {
    id: crypto.randomUUID(),
    brand: 'Ford',
    model: 'Fiesta',
  }
]