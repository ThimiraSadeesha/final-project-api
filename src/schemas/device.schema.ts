import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../utils/enums/status.enum';
import { User } from './user.schema';
import { Vehicle } from './vehicle.schema';
import { Incident } from './incident.schema';
import { DeviceConfig } from './device-config.schema';

@Entity('tbl_device')
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  deviceId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  type: string;

  @Column({ type: 'varchar', length: 15, default: Status.ACTIVE })
  deviceStatus: Status;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  lastMaintenance: Date;

  @ManyToOne(() => Vehicle, vehicle => vehicle.device, { nullable: false })
  vehicle: Vehicle;

  @ManyToOne(() => User, user => user.device)
  user: User;

  @OneToMany(() => Incident, incident => incident.device)
  incidents: Incident[];

  @OneToMany(() => DeviceConfig, config => config.device)
  configurations: DeviceConfig[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
