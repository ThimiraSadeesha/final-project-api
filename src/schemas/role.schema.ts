import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../utils/enums/status.enum';
import { User } from './user.schema';


@Entity('tbl_role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  roleName: string;

  @Column({ type: 'varchar', length: 255 ,nullable: false})
  permission: string;

  @Column({ type: 'varchar', length: 15, default: Status.ACTIVE})
  roleStatus: Status;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
