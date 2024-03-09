import { Product } from 'src/products/entities/product.entity';
import { Size } from 'src/products/enums/size.enum';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Price extends AbstractEntity<Price> {
  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  size: Size;

  // @ManyToOne(() => Product, (product) => product.prices, { onDelete: 'SET NULL' })
  // @JoinColumn()
  // product: Product;
}
