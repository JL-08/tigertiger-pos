import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class CategoryItem extends AbstractEntity<CategoryItem> {
  @Column({ nullable: false })
  name: string;

  @Column()
  code: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  discount: number;

  @ManyToOne(() => Category, (category) => category.categoryItems, { onDelete: 'SET NULL' })
  @JoinColumn()
  category: Category;
}
