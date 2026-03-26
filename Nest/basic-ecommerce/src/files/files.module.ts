import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule]
})
export class FilesModule {}
