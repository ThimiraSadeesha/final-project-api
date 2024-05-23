import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.schema';
import { NotificationSchema } from './notification.schema';

@Entity('tbl_emergency_person')
export class EmergencyPerson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  personName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  relation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  nic: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  contactNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @ManyToMany(() => User, user => user.emergencyPerson)
  users: User[];

  @OneToMany(() => NotificationSchema, notification => notification.emergencyPerson)
  notifications: NotificationSchema[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
