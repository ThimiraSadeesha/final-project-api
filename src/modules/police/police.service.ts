import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreatePoliceDTO, UpdatePoliceDTO } from './police.entity'

@Injectable()
export class PoliceService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.police_getAll()')
    return processData(result, 0)
  }

  async create(createPoliceDTO: CreatePoliceDTO) {
    return await this.dataSourceRepository.query('CALL accident_detection_DB.police_save(?,?,?,?,?,?,?)', [
      createPoliceDTO.code,
      createPoliceDTO.name,
      createPoliceDTO.province,
      createPoliceDTO.city,
      createPoliceDTO.district,
      createPoliceDTO.areaCovered,
      createPoliceDTO.contactNumber,
    ])
  }


  async update(Id: number, updatePoliceDTO: UpdatePoliceDTO) {
    return await this.dataSourceRepository.query('CALL accident_detection_DB.police_update(?,?,?,?,?,?,?,?)', [
      Id,
      updatePoliceDTO.code,
      updatePoliceDTO.name,
      updatePoliceDTO.contactNumber,
      updatePoliceDTO.city,
      updatePoliceDTO.district,
      updatePoliceDTO.province,
      updatePoliceDTO.areaCovered,
    ])
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.police_get(?)', [
      id,
    ])
    return processData(result, 1)
  }


}
