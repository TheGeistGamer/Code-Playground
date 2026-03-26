import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  title: string

  @Column('float', {
    default: 0
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true
  })
  descripcion: string

  @Column('text', {
    unique: true
  })
  slug: string

  @Column('int', {
    default: 0
  })
  stock: number

  @Column('text', {
    array: true
  })
  sizes: string[]

  @Column('text')
  gender: string

  @Column('text', {
    array: true,
    default: []
  })
  tags: string[]

  @OneToMany(
    () => ProductImage,
    (ProductImage) => ProductImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[]

  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User

  @BeforeInsert()
  checkSlug() {
    if (!this.slug) {
      this.slug = this.title.toLowerCase().replace(' ', '-').replace("'", '')
    }

    this.slug = this.slug.toLowerCase().replace(' ', '-').replace("'", '')
  }

  @BeforeUpdate()
  checkSlugOnUpdate() {
    this.slug = this.slug.toLowerCase().replace(' ', '-').replace("'", '')
  }
}
