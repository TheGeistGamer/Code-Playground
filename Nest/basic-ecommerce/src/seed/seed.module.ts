import { ProductsModule } from 'src/products/products.module';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SeedService } from './seed.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SeedController],
  imports: [ProductsModule, AuthModule],
  providers: [SeedService],
})
export class SeedModule {}
