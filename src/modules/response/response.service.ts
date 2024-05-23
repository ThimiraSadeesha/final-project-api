import { Injectable } from '@nestjs/common';
import { processData } from '../../utils/enums/util.enums'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreateResponseDTO, UpdateResponseDTO } from './response.entity'

@Injectable()
export class ResponseService {

  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {}

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.response_getAll()')
    return processData(result, 0)
  }

  async create(createPoliceDTO: CreateResponseDTO) {
    return await this.dataSourceRepository.query('CALL accident_detection_DB.response_save(?,?,?,?,?,?)', [
     createPoliceDTO.responseStatus,
     createPoliceDTO.responseTime,
     createPoliceDTO.incidentId,
     createPoliceDTO.fireDepartmentId,
     createPoliceDTO.policeDepartmentId,
     createPoliceDTO.hospitalDepartmentId,
    ])
  }


  async update(Id: number, updatePoliceDTO:UpdateResponseDTO) {
    return await this.dataSourceRepository.query('CALL accident_detection_DB.response_update(?,?,?,?,?,?,?)', [
      Id,
      updatePoliceDTO.responseStatus,
      updatePoliceDTO.responseTime,
      updatePoliceDTO.incidentId,
      updatePoliceDTO.fireDepartmentId,
      updatePoliceDTO.policeDepartmentId,
      updatePoliceDTO.hospitalDepartmentId,
    ])
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.response_get(?)', [
      id,
    ])
    return processData(result, 1)
  }


}
