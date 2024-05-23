import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Incident } from './incident.schema'

@Entity('tbl_fire')
export class FireDepartment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  fireCode: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  fireName: string;

  @Column({ type: 'varchar', length: 50 ,unique: true,nullable: false})
  contactNumber: string;

  @Column({ type: 'varchar', length: 255 ,nullable: false})
  city: string;

  @Column({ type: 'varchar', length: 255 ,nullable: false})
  district: string;

  @Column({ type: 'varchar', length: 255 ,nullable: false})
  province: string;

  @Column({ type: 'varchar', length: 255 ,nullable: false})
  areaCovered: string;

  @ManyToMany(() => Incident)
  incidents: Incident[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}


