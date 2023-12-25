import { Column, Entity, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends AbstractEntity<User> {
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.employee,
  })
  role: Role;
}
