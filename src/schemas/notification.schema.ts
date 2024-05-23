import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.schema';
import { Incident } from './incident.schema';
import { EmergencyPerson } from './emergency-person.schema';

@Entity('tbl_notification')
export class NotificationSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @ManyToMany(() => Incident, incident => incident.notifications)
  incidents: Incident[];

  @ManyToMany(() => EmergencyPerson, emergencyPerson => emergencyPerson.notifications)
  emergencyPerson: EmergencyPerson[];


  @ManyToOne(
    () => User,
    (user) => user.notification,
    {nullable: false}
  )
  notification: User

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
