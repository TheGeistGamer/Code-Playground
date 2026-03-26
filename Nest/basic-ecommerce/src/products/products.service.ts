import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource
  ) {}
  
  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images = [], ...productDetails } = createProductDto

      // crea la instancia del producto
      const product = this.productRepository.create({
        ...productDetails,
        user,
        images: images.map(image => this.productImageRepository.create({ url: image }))
      })

      // guarda el producto en la base de datos
      await this.productRepository.save(product)

      return { ...product, images }
    } catch (error) {
      this.handleException(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit=10, offset=0 } = paginationDto

    const productos = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
    })

    return productos.map(producto => ({ 
      ...producto, 
      images: producto.images.map(image => image.url) 
    }))
  }

  async findOne(term: string) {
    let product: Product

    // determinar si es un UUID
    if (term.length === 36) {
      product = await this.productRepository.findOneBy({ id: term })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('product')
      // busca el producto por el título y por slug
      product = await queryBuilder.where('title ILIKE :term', { term: `%${term}%` })
      .leftJoinAndSelect('product.images', 'prodImages')
      .getOne()
    }

    if (!product) throw new BadRequestException('Product not found')

    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({ id, ...toUpdate });
    if (!product) throw new BadRequestException('Product not found');

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map(image => this.productImageRepository.create({ url: image }));
      } else {

      }

      product.user = user
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return product
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleException(error) 
    }
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    this.productRepository.delete(producto.id)

    return 'Product deleted successfully'
  }

  async findOnePlain (term: string) {
    const { images=[], ...rest } = await this.findOne(term)
    
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }

  private handleException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server log')
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute()
    } catch (error) {
      this.handleException(error) 
    }
  }
}
