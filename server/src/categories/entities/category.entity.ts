import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Category extends AbstractEntity<Category> {
  @Column({ nullable: false })
  name: string;
}
