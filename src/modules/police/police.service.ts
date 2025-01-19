import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData, processPaginationData } from '../../utils/enums/util.enums'
import { CreatePoliceDTO, UpdatePoliceDTO } from './police.entity'

@Injectable()
export class PoliceService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async find(code: string, name: string, itemPerPage: number, page: number) {
    const result = await this.dataSourceRepository.query('CALL police_find(?,?,?,?)', [
      code, name, itemPerPage, page,
    ])
    return processPaginationData(result)
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL police_getAll()')
    return processData(result, 0)
  }

  async create(createPoliceDTO: CreatePoliceDTO) {
    return await this.dataSourceRepository.query('CALL police_save(?,?,?,?,?,?,?)', [
      createPoliceDTO.code,
      createPoliceDTO.name,
      createPoliceDTO.contactNumber,
      createPoliceDTO.city,
      createPoliceDTO.district,
      createPoliceDTO.province,
      createPoliceDTO.areaCovered,

    ])
  }


  async update(Id: number, updatePoliceDTO: UpdatePoliceDTO) {
    return await this.dataSourceRepository.query('CALL police_update(?,?,?,?,?,?,?,?)', [
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
    const result = await this.dataSourceRepository.query('CALL police_get(?)', [
      id,
    ])
    return processData(result, 1)
  }


}
