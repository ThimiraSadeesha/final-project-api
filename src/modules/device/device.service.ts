import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateDeviceDTO, UpdateDeviceDTO } from './device.entity'

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.device_getAll()')
    return processData(result, 0)
  }

  async create(createDeviceDTO:CreateDeviceDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.device_save(?,?,?,?,?,?)', [
      createDeviceDTO.name,
      createDeviceDTO.type,
      createDeviceDTO.deviceStatus,
      createDeviceDTO.vehicleId,
      createDeviceDTO.userId,

    ])
    return processData(result, 1)
  }

  async update(id:number,updateFireDTO:UpdateDeviceDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.device_update(?,?,?,?,?,?,?)', [
      id,
      updateFireDTO.name,
      updateFireDTO.type,
      updateFireDTO.deviceStatus,
      updateFireDTO.vehicleId,
      updateFireDTO.userId,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.device_get(?)', [
      id,
    ])
    return processData(result, 1)
  }



}

