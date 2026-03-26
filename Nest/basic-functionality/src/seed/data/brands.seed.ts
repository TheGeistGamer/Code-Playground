import { Brand } from 'src/brands/entities/brand.entity';

export const Brands_SEED: Brand[] = [
  {
    id: crypto.randomUUID(),
    name: 'Volvo',
    createdAt: new Date().getTime(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Ford',
    createdAt: new Date().getTime(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Chevrolet',
    createdAt: new Date().getTime(),
  }
]