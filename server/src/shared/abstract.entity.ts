import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class AbstractEntity<T> {
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  modifiedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @VersionColumn({ select: false })
  version: number;
}
