import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("tbl_data_type")
export class DataSource extends BaseEntity{
  @PrimaryGeneratedColumn({name:"data_type_id"})
  dataTypeId: number
  @Column({name:"data_type_name"})
  dataTypeName: string
}
