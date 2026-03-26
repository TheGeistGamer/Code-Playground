import { UpdateBrandDto } from './dto/update-brand.dto'
import { CreateBrandDto } from './dto/create-brand.dto'
import { Brand } from './entities/brand.entity'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: crypto.randomUUID(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // }
  ]

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: crypto.randomUUID(),
      name: createBrandDto.name,
      createdAt: new Date().getTime()
    }
    this.brands.push(brand)
    return brand 
  }

  findAll() {
    return this.brands
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id)
    if (!brand) throw new NotFoundException(`Brand #${id} not found`)
    return brand
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const currentBrand = this.findOne(id)

    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        return {
          ...currentBrand,
          updatedAt: new Date().getTime(),
          ...updateBrandDto,
        }
      }
    })

    return 'This action updates a brand'
  }

  remove(id: string) {
    const currentBrand = this.findOne(id)
    this.brands = this.brands.filter(brand => brand.id !== currentBrand.id)

    return 'This action removes a brand'
  }

  fillBrandsWithSeed(brands: Brand[]) {
    this.brands = brands
  }
}
