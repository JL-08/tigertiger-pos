import { CategoryItem } from 'src/category-items/entities/category-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => CategoryItem, (categoryItem) => categoryItem.category, { onDelete: 'SET NULL', eager: true, cascade: true })
  categoryItems: CategoryItem[];

  @ManyToOne(() => Product, (product) => product.categories, { onDelete: 'SET NULL' })
  @JoinColumn()
  product: Product;
}
