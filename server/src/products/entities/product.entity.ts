import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Price } from 'src/prices/entities/price.entity';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;
  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  image: string;

  @OneToMany(() => Price, (price) => price.product, { onDelete: 'SET NULL', eager: true, cascade: true })
  @JoinColumn()
  prices: Price[];

  @ManyToOne(() => Category, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  category: Category;
}
