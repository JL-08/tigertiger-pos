import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column({ nullable: false })
  name: string;
}
