import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  image: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;
}
