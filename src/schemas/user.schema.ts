import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from './role.schema';
import { Vehicle } from './vehicle.schema';
import { Device } from './device.schema';
import { EmergencyPerson } from './emergency-person.schema';
import { NotificationSchema } from './notification.schema';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  userName: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  nic: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contactNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 255 })
  userPassword: string;

  @Column({ type: 'varchar', length: 15, default: 'ACTIVE' })
  userStatus: string;

  @ManyToOne(() => Role, { eager: true }) // eager loading role
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Vehicle, { eager: true }) // eager loading vehicle
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @ManyToOne(() => Device, { eager: true, nullable:true })
  @JoinColumn({ name: 'deviceId' })
  device: Device;

  @ManyToOne(() => EmergencyPerson, { eager: true })
  @JoinColumn({ name: 'emergencyPersonId' })
  emergencyPerson: EmergencyPerson;

  @ManyToOne(() => NotificationSchema , { eager: true,nullable:true })
  @JoinColumn({ name: 'notificationId' })
  notification: NotificationSchema ;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
