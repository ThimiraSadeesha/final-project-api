// import {
//   BaseEntity,
//   Column,
//   Entity, ManyToMany,
//   ManyToOne, OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm'
// import { Status } from '../utils/enums/status.enum';
// import { Role } from './role.schema';
// import { Vehicle } from './vehicle.schema'
// import { EmergencyPerson } from './emergency-person.schema'
// import { Device } from './device.schema'
// import { NotificationSchema } from './notification.schema'
//
// @Entity('tbl_driver')
// export class DriverSchema extends BaseEntity {
//
//   //turn off the nullable true
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @Column({ type: 'varchar', length: 255 })
//   userName: string;
//
//   @Column({ type: 'varchar', length: 255 })
//   fullName: string;
//
//   @Column({ type: 'varchar', length: 15, unique: true })
//   nic: string;
//
//   @Column({ type: 'varchar', length: 20, nullable: true })
//   contactNumber: string;
//
//   @Column({ type: 'varchar', length: 50, nullable: true })
//   email: string;
//
//   @Column({ type: 'varchar', length: 10 })
//   gender: string;
//
//   @Column({ type: 'varchar', length: 255, nullable: true })
//   address: string;
//
//   @Column({ type: 'varchar', length: 255 ,nullable: true})
//   city: string;
//
//   @Column({ type: 'varchar', length: 255 ,nullable: true})
//   district: string;
//
//   @Column({ type: 'varchar', length: 255 ,nullable: true})
//   province: string;
//
//   @Column({ type: 'varchar', length: 255 ,nullable: true})
//   userPassword: string;
//
//   @Column({ type: 'varchar', length: 15, default: Status.ACTIVE})
//   userStatus: Status;
//
//   @ManyToOne(() => Role, role => role.driver, { cascade: true })
//   role: Role;
//
//   @ManyToMany(() => Vehicle, { cascade: true })
//   vehicles: Vehicle[]
//
//   @ManyToMany(() => EmergencyPerson, { cascade: true })
//   emergencyPerson: EmergencyPerson[]
//
//   @ManyToMany(() => Device, { cascade: true })
//   devices: Device[]
//
//   @OneToMany(
//     () => NotificationSchema,
//     (notificationSchema) => notificationSchema.driver,
//   )
//   notifications: NotificationSchema[]
//
//
//   @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;
//
//   @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }
//
