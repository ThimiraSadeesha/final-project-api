import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../utils/enums/status.enum';
import { Device } from './device.schema'

@Entity('tbl_device_config')
export class DeviceConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 ,nullable: false})
  configType: string;

  @Column({ type: 'varchar', length: 15, default: Status.ACTIVE})
  deviceStatus: Status;

  @ManyToOne(() => Device, device => device.configurations)
  device: Device;

  @Column()
  configBy: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}


