import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticImg(name: string) {
    const path = join(__dirname, '../../uploads/products', name)
    if (!existsSync(path)) throw new BadRequestException('Imagen no encontrada!')

    return path
  }
}
