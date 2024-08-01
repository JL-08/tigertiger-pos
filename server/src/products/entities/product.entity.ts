import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Category } from 'src/categories/entities/category.entity';
import { ValidateNested } from 'class-validator';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  image: string;

  // @OneToMany(() => Price, (price) => price.product, { onDelete: 'SET NULL', eager: true, cascade: true })
  // @JoinColumn()
  // prices: Price[];

  @Column()
  price: number;

  @Column({ nullable: true })
  discount: number;

  @OneToMany(() => Category, (category) => category.product, { onDelete: 'CASCADE', eager: true, cascade: true })
  @JoinColumn()
  categories: Category[];

  @ManyToOne(() => Group, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  group: Group;
}
