import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Group extends AbstractEntity<Group> {
  @Column({ nullable: false })
  name: string;
}
