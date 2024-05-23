import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateDeviceDTO, UpdateDeviceDTO } from '../device/device.entity'
import { CreateDeviceConfigDTO, UpdateDeviceConfigDTO } from './device-config.entity'

@Injectable()
export class DeviceConfigService {

  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.device_config_getAll()')
    return processData(result, 0)
  }

  async create(createDeviceConfigDTOO:CreateDeviceConfigDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.device_config_save(?,?,?,?)', [
      createDeviceConfigDTOO.configType,
      createDeviceConfigDTOO.deviceStatus,
      createDeviceConfigDTOO.configBy,
      createDeviceConfigDTOO.deviceId,

    ])
    return processData(result, 1)
  }

  async update(id:number,updateDeviceConfigDTO:UpdateDeviceConfigDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.device_config_update(?,?,?,?,?)', [
      id,
      updateDeviceConfigDTO.configType,
      updateDeviceConfigDTO.deviceStatus,
      updateDeviceConfigDTO.configBy,
      updateDeviceConfigDTO.deviceId,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.device_config_get(?)', [
      id,
    ])
    return processData(result, 1)
  }


}
