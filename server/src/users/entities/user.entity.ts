import { Column, Entity, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends AbstractEntity<User> {
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.EMPLOYEE,
  })
  role: Role;

  @Column({ nullable: true })
  refreshToken: string;
}
