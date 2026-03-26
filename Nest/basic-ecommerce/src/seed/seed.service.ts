import { ProductsService } from 'src/products/products.service'
import { User } from 'src/auth/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { initialData } from './data/seed-data'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async runSeed() {
    await this.deleteTables()
    const adminUser = await this.insertUsers()
    await this.insertNewProduct(adminUser)

    return 'Seed executed!'
  }

  private async insertUsers() {
    const seedUsers = initialData.users
    const users: User[] = []

    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user))
    })

    const userDB = await this.userRepository.save(users);
    return userDB[0]
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts()

    const queryBuilder = this.userRepository.createQueryBuilder() 
    await queryBuilder.delete().where({}).execute()
  }

  private async insertNewProduct(user: User){
    const products = initialData.products
    const insertPromise = []

    products.forEach(product => {
      insertPromise.push(this.productsService.create(product, user))
    })

    await Promise.all(insertPromise)
  }
}
