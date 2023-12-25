import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  modifiedDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedDate: Date;

  @Column({ default: 1 })
  version: number;
}
