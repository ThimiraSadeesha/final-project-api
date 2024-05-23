import { Injectable } from '@nestjs/common'
import { processData } from '../../utils/enums/util.enums'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreateVehicleDTO, UpdateVehicleDTO } from './vehicle.entity'

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.vehicle_getAll()')
    return processData(result, 0)
  }

  async create(createVehicleDTO: CreateVehicleDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.vehicle_save(?,?,?,?)', [
      createVehicleDTO.vehicleNumber,
      createVehicleDTO.manufactureYear,
      createVehicleDTO.vehicleType,
      createVehicleDTO.vehicleModel,
    ])
    return processData(result, 1)
  }


  async update(vehicleId:number,updateVehicleDTO: UpdateVehicleDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.vehicle_update(?,?,?,?,?)', [
      vehicleId,
      updateVehicleDTO.vehicleNumber,
      updateVehicleDTO.manufactureYear,
      updateVehicleDTO.vehicleType,
      updateVehicleDTO.vehicleModel,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.vehicle_get(?)', [
      id,
    ])
    return processData(result, 1)
  }


}
