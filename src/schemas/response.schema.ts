import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Status } from '../utils/enums/status.enum';

import { Incident } from './incident.schema'
import { HospitalDepartment } from './hospital.schema'
import { FireDepartment } from './fire.schema'
import { PoliceDepartment } from './police.schema'

@Entity('tbl_response')
export class Response extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Incident)
  incident: Incident;

  @ManyToOne(() => PoliceDepartment, { nullable: true })
  policeDepartment: PoliceDepartment;

  @ManyToOne(() => FireDepartment, { nullable: true })
  fireDepartment: FireDepartment;

  @ManyToOne(() => HospitalDepartment, { nullable: true })
  hospitalDepartment: HospitalDepartment;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'varchar', length: 255,default:Status.PROCESSING })
  responseStatus: Status;

  @Column({ type: 'varchar', length: 255 })
  responseTime: string;
}