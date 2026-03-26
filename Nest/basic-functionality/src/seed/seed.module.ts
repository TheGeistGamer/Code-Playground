import { BrandsModule } from 'src/brands/brands.module';
import { SeedController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { SeedService } from './seed.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CarsModule, BrandsModule],
})
export class SeedModule {}
