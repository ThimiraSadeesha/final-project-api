import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.schema';
import { Device } from './device.schema';

@Entity('tbl_vehicle')
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  vehicleNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  manufactureYear: string;

  @Column({ type: 'varchar', length: 10 })
  vehicleType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  model: string;

  @ManyToMany(() => User,user => user.vehicle)
  users: User[];

  @OneToMany(() => Device, device => device.vehicle)
  @JoinColumn({ name: 'deviceId' })
  device: Device[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
