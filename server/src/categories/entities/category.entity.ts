import { CategoryItem } from 'src/category-items/entities/category-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column()
  name: string;

  @OneToMany(() => CategoryItem, (categoryItem) => categoryItem.category, { onDelete: 'CASCADE', eager: true, cascade: true })
  categoryItems: CategoryItem[];

  @ManyToOne(() => Product, (product) => product.categories, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;
}
