import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Status } from '../utils/enums/status.enum';
import { Device } from './device.schema'
import { IncidentHistory } from './incident-history.schema'
import { FireDepartment } from './fire.schema'
import { HospitalDepartment } from './hospital.schema'
import { PoliceDepartment } from './police.schema'
import {  NotificationSchema } from './notification.schema'

@Entity('tbl_incident')
export class Incident extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  severity: string;

  @Column({ type: 'varchar', length: 255,nullable: true  })
  location: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @Column({ type: 'varchar', length: 15, default: Status.OPEN})
  incidentStatus: Status;

  @ManyToOne(() => Device, device => device.incidents)
  device: Device;

  @OneToMany(() => NotificationSchema, notification => notification.incidents)
  notifications: NotificationSchema[];

  @ManyToMany(() => PoliceDepartment)
  police: PoliceDepartment[];

  @ManyToMany(() => FireDepartment)
  fireDepartments: FireDepartment[];

  @ManyToMany(() => HospitalDepartment)
  hospitals: HospitalDepartment[];

  @OneToMany(() => IncidentHistory, history => history.incident)
  history: IncidentHistory[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

